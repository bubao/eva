/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-01-15 16:30:08
 * @LastEditors: bubao
 * @LastEditTime: 2020-06-28 17:16:55
 */
const _ = require("lodash");
const ora = require("ora");
const os = require("os");
const promisify = require("util").promisify;
const { path, fs } = require("../../tools/commonModules");
const ReadFile = promisify(fs.readFile);
const mkdirp = promisify(require("mkdirp"));
const exec = promisify(require("child_process").exec);
const WriteFile = promisify(fs.writeFile);

/**
 * @description 更新版本
 * @author bubao
 * @date 2020-06-28
 * @param {*} sourcePath
 * @returns
 */
async function update(sourcePath) {
	sourcePath = path.resolve(sourcePath || "./");
	const spinner = ora({
		text: "开始更新",
		spinner: {
			interval: 80,
			frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
		},
		color: "cyan"
	}).start();
	const evaPath = path.join(os.homedir(), ".eva");
	// * 检查配置文件是否存在
	const Configuration = await getConfiguration(evaPath);
	// TODO 如果这个值存在，就更新配置中的源码路径
	let source;
	if (!Configuration.exists) {
		source = await getSourcePath(sourcePath);
	} else {
		// 从配置文件中获取源码路径
		source = await getSourcePath(Configuration.config.source);
		sourcePath = Configuration.config.source;
	}

	// 文件不存在则退出
	if (!source) {
		spinner.fail("更新失败，请重试");
		return;
	}
	spinner.text = "更新代码";
	// * 更新代码
	await exec(`cd ${sourcePath} && git pull`);
	// * 获取新的配置
	const Source = JSON.parse(await ReadFile(source));
	if (!Configuration.exists) {
		Configuration.config = Source;
	}
	const SourceD = { ...Source.dependencies, ...Source.devDependencies };
	const ConfigurationD = {
		...Configuration.config.dependencies,
		...Configuration.config.devDependencies
	};
	const SourceDA = _.forIn(SourceD, (value, key) => {
		return JSON.stringify({ value, key });
	});
	const ConfigurationDA = _.forIn(ConfigurationD, (value, key) => {
		return JSON.stringify({ value, key });
	});
	const ConfigurationDAL = _.difference(ConfigurationDA, SourceDA).length;
	const SourceDAL = _.difference(SourceDA, ConfigurationDA).length;
	if ((ConfigurationDAL === 0 || SourceDAL === 0) && Configuration.exists) {
		spinner.text = "重装";
	} else {
		spinner.text = "更新依赖";
		await WriteFile(
			`${evaPath}/package.json`,
			JSON.stringify({
				...Source,
				source: sourcePath
			})
		);
	}
	// * 需要安装依赖
	const { stderr } = await exec(
		`cd ${sourcePath} &&sudo cnpm i -g . --registry=https://registry.npm.taobao.org`
	);
	stderr ? spinner.fail(stderr) : spinner.succeed("更新成功");
}

function fsState(sourcePath) {
	return new Promise(resolve => {
		fs.stat(sourcePath, (err, state) => {
			if (err) {
				return resolve({ error: true });
			}

			resolve({
				error: false,
				isDirectory: state.isDirectory(),
				isFile: state.isFile()
			});
		});
	});
}

async function getConfiguration(sourcePath) {
	const FsStat = await fsState(sourcePath);
	const configPath = path.join(sourcePath, "package.json");
	if (FsStat.error) {
		await mkdirp(sourcePath);
		return {
			exists: false,
			config_dir: sourcePath,
			config_path: configPath
		};
	}

	const config = await fsState(configPath);
	if (config.error || config.isDirectory) {
		return {
			exists: false,
			config_dir: sourcePath,
			config_path: configPath
		};
	}
	try {
		const config = await ReadFile(configPath);
		return {
			exists: true,
			config_dir: sourcePath,
			config_path: configPath,
			config: JSON.parse(config)
		};
	} catch (error) {
		return {
			exists: false,
			config_dir: sourcePath,
			config_path: configPath
		};
	}
}

async function getSourcePath(sourcePath) {
	if (!sourcePath) {
		return false;
	}
	const FsStat = await fsState(sourcePath);
	const { error, isFile } = FsStat;
	if (error || isFile) {
		// 目录不存在
		return false;
	}
	const packageFile = path.join(sourcePath, "package.json");
	const packageJson = await fsState(packageFile);
	if (packageJson.error || packageJson.isDirectory) {
		// 文件不存在
		return false;
	}
	try {
		JSON.parse(await ReadFile(packageFile));
	} catch (err) {
		return false;
	}
	return packageFile;
}

module.exports = update;

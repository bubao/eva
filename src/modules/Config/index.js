/**
 * @description:
 * @author: bubao
 * @date: 2021-01-18 17:26:37
 * @last author: bubao
 * @last edit time: 2021-01-18 22:54:54
 */

const fs = require("fs").promises;
const path = require("path");
const os = require("os");
const _ = require("lodash");
// const promisify = require("util").promisify;
// const mkdirp = promisify(require("mkdirp"));
const mkdirp = require("mkdirp");

class Configuration {
	constructor() {
		Configuration.init();
		this.flag = {
			packageExists: false, // env文件存在
			needsUpdate: false // 对比不同标记
		};
		this.rootPath = undefined;
		this.config = undefined; // * 配置文件
		this.getEnvPath();
	}

	/**
	 * 单例初始化
	 * @static
	 * @returns {Configuration} 实例
	 * @memberof Configuration
	 */
	static init() {
		if (!this.instance) {
			this.instance = true;
			this.instance = new this();
		}
		return this.instance;
	}

	/**
	 * @description 获取配置文件路径
	 * @author bubao
	 * @date 2021-01-18
	 * @returns {{path: string, filename: string}}
	 * @memberof Configuration
	 */
	getEnvPath() {
		const env_path = path.join(os.homedir(), ".eva");
		const env_file_name = path.join(env_path, "package.json");
		this.envConfig = {
			path: env_path,
			filename: env_file_name
		};
		return this.envConfig;
	}

	/**
	 * @description 检测package是否存在
	 * @author bubao
	 * @date 2021-01-18
	 * @param {{path: string, filename: string}} env
	 * @return {Promise<boolean>}
	 * @memberof Configuration
	 */
	async packageExists(env) {
		// * 检测配置文件是否存在
		// * 参数不对
		if (!(!!env.filename && !!env.path)) return false;
		await fs.stat(env.path).catch(async () => {
			await mkdirp(env.path).catch(() => {
			});
		});

		const fileExists = await fs.stat(env.filename).catch(() => {
			return false;
		});
		// * 文件不存在
		if (fileExists && fileExists.isDirectory && fileExists.isDirectory()) {
			return false;
		}

		try {
			this.config = JSON.parse(await fs.readFile(env.filename));
		} catch (err) {
			return false;
		}

		return true;
	}

	/**
	 * @description 获取所有的env配置
	 * @author bubao
	 * @date 2021-01-18
	 * @returns
	 * @memberof Configuration
	 */
	async getAll(pj = "./") {
		if (!await this.packageExists(this.envConfig)) {
			let hasError = false;
			await this.getProjectPackageJson(pj).catch(() => {
				hasError = true;
			});
			if (hasError) return false;
		};
		try {
			// * 读取配置文件内容
			this.config = require(this.envConfig.filename);
			await this.getProjectPackageJson(pj);
		} catch (err) {
			console.log("01", err);
			await this.getProjectPackageJson(pj);
			return false;
		}
		this.flag.packageExists = true;
		return this.config;
	}

	async getProjectPackageJson(pj = "./") {
		// * 读取项目package.json文件
		// 如果配置不存在，则使用传入参数
		pj = path.resolve(pj);
		// 如果package.json存在，则直接返回
		if (this.ProjectPackageJson) {
			return this.ProjectPackageJson;
		}
		// * 如果不存在则生成新的配置文件
		if (this.config === undefined || this.config.source === undefined) {
			this.ProjectPackageJson = require(path.resolve(pj, "package.json"));
			this.config = { ...this.ProjectPackageJson, source: path.resolve(pj) };
			await fs.writeFile(this.envConfig.filename, JSON.stringify(this.config));
		}
		this.ProjectPackageJson = require(path.join(this.config.source, "package.json"));
		return this.ProjectPackageJson;
	}

	/**
	 * @description 检测项目是否有不同的包，需要先执行getAll
	 * @author bubao
	 * @date 2021-01-18
	 * @returns
	 * @memberof Configuration
	 */
	async isDiffs() {
		// * 对比两个配置的版本号和安装包异同，返回布尔值
		if (!this.config) {
			return false;
		}
		// 项目根目录package
		const getProjectPackage = await this.getProjectPackageJson();

		// 项目所有的包
		const ProjectAllDependencies = {
			...getProjectPackage.dependencies,
			...getProjectPackage.devDependencies
		};

		// 配置所有的包
		const EnvAllDependencies = {
			...this.config.dependencies,
			...this.config.devDependencies
		};

		const ProjectAllDependenciesArray = [];
		_.forIn(ProjectAllDependencies, (value, key) => {
			ProjectAllDependenciesArray.push(`${key}:${value}`);
		});

		const EnvAllDependenciesArray = [];
		_.forIn(EnvAllDependencies, (value, key) => {
			EnvAllDependenciesArray.push(`${key}:${value}`);
		});

		const diffLength = _.difference(ProjectAllDependenciesArray, EnvAllDependenciesArray).length + _.difference(EnvAllDependenciesArray, ProjectAllDependenciesArray).length;
		if (diffLength) {
			return { filename: this.envConfig.filename, data: JSON.stringify({ ...getProjectPackage, source: this.config.source, other: this.config.other }) };
		}
	}

	async update(data = {}) {
		// * 更新配置文件方法
		this.config.other = { ...this.config.other, ...data };
		await fs.writeFile(this.envConfig.filename, JSON.stringify({ ...await this.getProjectPackageJson(), source: this.config.source, other: this.config.other }));
	}

	async delete(key) {
		// * 删除配置文件指定key内容
		if (!key) {
			return false;
		}
		delete this.config.other[key];
		await fs.writeFile(this.envConfig.filename, JSON.stringify({ ...await this.getProjectPackageJson(), source: this.config.source, other: { ...this.config.other } }));
	}
}

module.exports = Configuration;

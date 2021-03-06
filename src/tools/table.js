const Table = require("cli-table2");

module.exports = new Table({
	chars: {
		top: "═",
		"top-mid": "╤",
		"top-left": "╔",
		"top-right": "╗",
		bottom: "═",
		"bottom-mid": "╧",
		"bottom-left": "╚",
		"bottom-right": "╝",
		left: "║",
		"left-mid": "╟",
		mid: "─",
		"mid-mid": "┼",
		right: "║",
		"right-mid": "╢",
		middle: "│"
	}
});

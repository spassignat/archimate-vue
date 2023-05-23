class ArchiMateElement {
	/**
	 * {string}
	 */
	id;
	/**
	 * {string}
	 */
	name;
	/**
	 * {string}
	 */
	documentation;
	constructor(id = "", name = "", documentation = "") {
		this.id = id;
		this.name = name;
		this.documentation = documentation;
	}
}

class Relationship {
	source;
	target;
	kind;
	constructor(id = "", source = "", target = "", kind = "") {
		this.source = source;
		this.id = id;
		this.target = target;
	}
}

module.exports = ArchiMateElement

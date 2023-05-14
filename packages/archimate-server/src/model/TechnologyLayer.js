// TechnologyElement.js
const ArchiMateElement = require("./Base.js");

class TechnologyElement extends ArchiMateElement {
	technology;
	constructor(id, name, documentation, technology="") {
		super(id, name, documentation);
	}
}

class TechnologyDevice extends TechnologyElement {
	constructor(id, name, documentation, technology="") {
		super(id, name, documentation);
	}
}

class TechnologyNetwork extends TechnologyElement {
	constructor(id, name, documentation, technology="") {
		super(id, name, documentation);
	}
}

class TechnologySystemSoftware extends TechnologyElement {
	constructor(id, name, documentation, technology="") {
		super(id, name, documentation);
	}
}

class TechnologyInfrastructureInterface extends TechnologyElement {
	constructor(id, name, documentation, technology="") {
		super(id, name, documentation);
	}
}

module.exports = {
	TechnologyDevice,
	TechnologyElement,
	TechnologyInfrastructureInterface,
	TechnologyNetwork,
	TechnologySystemSoftware
}

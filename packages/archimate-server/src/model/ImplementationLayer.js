const ArchiMateElement = require("./Base.js");

class ImplementationElement extends ArchiMateElement {
	constructor(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract) {
		super(id, name, documentation);
		this.type = type;
		this.isExternallyManaged = isExternallyManaged;
		this.isEncapsulated = isEncapsulated;
		this.isAbstract = isAbstract;
	}
}

class ImplementationProcess extends ImplementationElement {
	constructor(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract) {
		super(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract);
	}
}

class ImplementationWorkPackage extends ImplementationElement {
	constructor(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract) {
		super(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract);
	}
}

class ImplementationPlateau extends ImplementationElement {
	constructor(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract) {
		super(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract);
	}
}

class ImplementationArtifact extends ImplementationElement {
	constructor(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract) {
		super(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract);
	}
}

module.exports = {
	ImplementationArtifact,
	ImplementationElement,
	ImplementationPlateau,
	ImplementationProcess,
	ImplementationWorkPackage
}

import {ArchiMateElement} from "./Base.js";

export class ImplementationElement extends ArchiMateElement {
	constructor(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract) {
		super(id, name, documentation);
		this.type=type;
		this.isExternallyManaged=isExternallyManaged;
		this.isEncapsulated=isEncapsulated;
		this.isAbstract=isAbstract;
	}
}
export class ImplementationProcess extends ImplementationElement {
	constructor(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract) {
		super(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract);
	}
}

export class ImplementationWorkPackage extends ImplementationElement {
	constructor(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract) {
		super(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract);
	}
}

export class ImplementationPlateau extends ImplementationElement {
	constructor(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract) {
		super(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract);
	}
}

export class ImplementationArtifact extends ImplementationElement {
	constructor(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract) {
		super(id, name, documentation, type, isExternallyManaged, isEncapsulated, isAbstract);
	}
}

// TechnologyElement.js
import {ArchiMateElement} from "./Base.js"

export class TechnologyElement extends ArchiMateElement {
	constructor(id, name, documentation, layer, technology) {
		super(id, name, documentation, layer);
		this.technology = technology;
	}
}

export class TechnologyDevice extends TechnologyElement {
	constructor(id, name, documentation, technology) {
		super(id, name, documentation, "Technology", technology);
	}
}

export class TechnologyNetwork extends TechnologyElement {
	constructor(id, name, documentation, technology) {
		super(id, name, documentation, "Technology", technology);
	}
}

export class TechnologySystemSoftware extends TechnologyElement {
	constructor(id, name, documentation, technology) {
		super(id, name, documentation, "Technology", technology);
	}
}

export class TechnologyInfrastructureInterface extends TechnologyElement {
	constructor(id, name, documentation, technology) {
		super(id, name, documentation, "Technology", technology);
	}
}

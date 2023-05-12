// TechnologyElement.js
import {ArchiMateElement} from "./Base.js"
export class TechnologyElement extends ArchiMateElement {
	constructor(name, documentation, layer, technology) {
		super(name, documentation, layer);
		this.technology = technology;
	}
}

export class TechnologyDevice extends TechnologyElement {
	constructor(name, documentation, technology) {
		super(name, documentation, "Technology", technology);
	}
}

export class TechnologyNetwork extends TechnologyElement {
	constructor(name, documentation, technology) {
		super(name, documentation, "Technology", technology);
	}
}

export class TechnologySystemSoftware extends TechnologyElement {
	constructor(name, documentation, technology) {
		super(name, documentation, "Technology", technology);
	}
}

export class TechnologyInfrastructureInterface extends TechnologyElement {
	constructor(name, documentation, technology) {
		super(name, documentation, "Technology", technology);
	}
}

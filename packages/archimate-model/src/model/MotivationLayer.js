import {ArchiMateElement} from "./Base.js"

export class MotivationStakeholder extends ArchiMateElement {
	constructor(id, name, description, role) {
		super(id, name, documentation);
		this.role = role;
	}
}

export class MotivationDriver extends ArchiMateElement {
	constructor(id, name, description, type) {
		super(id, name, documentation);
		this.type = type;
	}
}

export class MotivationAssessment extends ArchiMateElement {
	constructor(id, name, description, type, value) {
		super(id, name, documentation);
		this.type = type;
		this.value = value;
	}
}

export class MotivationGoal extends ArchiMateElement {
	constructor(id, name, description, category) {
		super(id, name, documentation);
		this.category = category;
	}
}

export class MotivationOutcome extends ArchiMateElement {
	constructor(id, name, description, type) {
		super(id, name, documentation);
		this.type = type;
	}
}

export class MotivationRequirement extends ArchiMateElement {
	constructor(id, name, description, type) {
		super(id, name, documentation);
		this.type = type;
	}
}

export class MotivationConstraint extends ArchiMateElement {
	constructor(id, name, description, type) {
		super(id, name, documentation);
		this.type = type;
	}
}

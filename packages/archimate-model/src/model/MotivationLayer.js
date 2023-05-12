export class MotivationStakeholder {
	constructor(name, description, role) {
		this.name = name;
		this.description = description;
		this.role = role;
	}
}

import {ArchiMateElement} from "./Base.js"
export class MotivationDriver {
	constructor(name, description, type) {
		this.name = name;
		this.description = description;
		this.type = type;
	}
}

export class MotivationAssessment {
	constructor(name, description, type, value) {
		this.name = name;
		this.description = description;
		this.type = type;
		this.value = value;
	}
}

export class MotivationGoal {
	constructor(name, description, category) {
		this.name = name;
		this.description = description;
		this.category = category;
	}
}

export class MotivationOutcome {
	constructor(name, description, type) {
		this.name = name;
		this.description = description;
		this.type = type;
	}
}

export class MotivationRequirement {
	constructor(name, description, type) {
		this.name = name;
		this.description = description;
		this.type = type;
	}
}

export class MotivationConstraint {
	constructor(name, description, type) {
		this.name = name;
		this.description = description;
		this.type = type;
	}
}

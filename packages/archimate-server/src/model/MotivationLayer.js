const ArchiMateElement = require("./Base.js");

class MotivationStakeholder extends ArchiMateElement {
	constructor(id, name, documentation, description, role) {
		super(id, name, documentation);
		this.role = role;
	}
}

class MotivationDriver extends ArchiMateElement {
	constructor(id, name, documentation, description, type) {
		super(id, name, documentation);
		this.type = type;
	}
}

class MotivationAssessment extends ArchiMateElement {
	constructor(id, name, documentation, description, type, value) {
		super(id, name, documentation);
		this.type = type;
		this.value = value;
	}
}

class MotivationGoal extends ArchiMateElement {
	constructor(id, name, documentation, description, category) {
		super(id, name, documentation);
		this.category = category;
	}
}

class MotivationOutcome extends ArchiMateElement {
	constructor(id, name, documentation, description, type) {
		super(id, name, documentation);
		this.type = type;
	}
}

class MotivationRequirement extends ArchiMateElement {
	constructor(id, name, documentation, description, type) {
		super(id, name, documentation);
		this.type = type;
	}
}

class MotivationConstraint extends ArchiMateElement {
	constructor(id, name, documentation, description, type) {
		super(id, name, documentation);
		this.type = type;
	}
}

module.exports = {
	MotivationAssessment,
	MotivationConstraint,
	MotivationDriver,
	MotivationGoal,
	MotivationOutcome,
	MotivationRequirement,
	MotivationStakeholder
}

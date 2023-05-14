const ArchiMateElement = require("./Base.js");

class BusinessActor extends ArchiMateElement {
	constructor(id, name, documentation, businessRole) {
		super(id, name, documentation);
		this.businessRole = businessRole;
	}
}

class BusinessCollaboration extends ArchiMateElement {
	constructor(id, name, documentation, businessRoles, functions, interactions) {
		super(id, name, documentation);
		this.businessRoles = businessRoles || [];
		this.functions = functions || [];
		this.interactions = interactions || [];
	}
}

class BusinessEvent extends ArchiMateElement {
	constructor(id, name, documentation, eventType) {
		super(id, name, documentation);
		this.eventType = eventType;
	}
}

class BusinessFunction extends ArchiMateElement {
	constructor(id, name, documentation, businessProcess, trigger) {
		super(id, name, documentation);
		this.businessProcess = businessProcess;
		this.trigger = trigger;
	}
}

class BusinessInteraction extends ArchiMateElement {
	constructor(id, name, documentation, source, target) {
		super(id, name, documentation);
		this.source = source;
		this.target = target;
	}
}

class BusinessObject extends ArchiMateElement {
	constructor(id, name, documentation, businessRole) {
		super(id, name, documentation);
		this.businessRole = businessRole;
	}
}

class BusinessProcess extends ArchiMateElement {
	constructor(id, name, documentation, businessObjects, functions, interactions) {
		super(id, name, documentation);
		this.businessObjects = businessObjects || [];
		this.functions = functions || [];
		this.interactions = interactions || [];
	}
}

class BusinessRole extends ArchiMateElement {
	constructor(id, name, documentation, businessActors, businessServices, businessProcesses) {
		super(id, name, documentation);
		this.businessActors = businessActors || [];
		this.businessServices = businessServices || [];
		this.businessProcesses = businessProcesses || [];
	}
}

class BusinessService extends ArchiMateElement {
	constructor(id, name, documentation, businessActors, businessRoles, businessProcesses) {
		super(id, name, documentation);
		this.businessActors = businessActors || [];
		this.businessRoles = businessRoles || [];
		this.businessProcesses = businessProcesses || [];
	}
}

module.exports = {
	ArchiMateElement,
	BusinessActor,
	BusinessCollaboration,
	BusinessEvent,
	BusinessFunction,
	BusinessInteraction,
	BusinessObject,
	BusinessProcess,
	BusinessRole,
	BusinessService
}

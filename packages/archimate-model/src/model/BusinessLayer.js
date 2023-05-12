import {ArchiMateElement} from "./Base.js"

export class BusinessActor extends ArchiMateElement {
	constructor(id, name, documentation,businessRole) {
		super(id, name, documentation);
		this.businessRole = businessRole;
	}
}

export class BusinessCollaboration extends ArchiMateElement {
	constructor(id, name, documentation, businessRoles, functions, interactions) {
		super(id, name, documentation);
		this.businessRoles = businessRoles || [];
		this.functions = functions || [];
		this.interactions = interactions || [];
	}
}

export class BusinessEvent extends ArchiMateElement {
	constructor(id, name, documentation, eventType) {
		super(id, name, documentation);
		this.eventType = eventType;
	}
}

export class BusinessFunction extends ArchiMateElement {
	constructor(id, name, documentation, businessProcess, trigger) {
		super(id, name, documentation);
		this.businessProcess = businessProcess;
		this.trigger = trigger;
	}
}

export class BusinessInteraction extends ArchiMateElement {
	constructor(id, name, documentation, source, target) {
		super(id, name, documentation);
		this.source = source;
		this.target = target;
	}
}

export class BusinessObject extends ArchiMateElement {
	constructor(id, name, documentation, businessRole) {
		super(id, name, documentation);
		this.businessRole = businessRole;
	}
}

export class BusinessProcess extends ArchiMateElement {
	constructor(id, name, documentation, businessObjects, functions, interactions) {
		super(id, name, documentation);
		this.businessObjects = businessObjects || [];
		this.functions = functions || [];
		this.interactions = interactions || [];
	}
}

export class BusinessRole extends ArchiMateElement {
	constructor(id, name, documentation,businessActors,businessServices,businessProcesses ) {
		super(id, name, documentation);
		this.businessActors = businessActors || [];
		this.businessServices = businessServices || [];
		this.businessProcesses = businessProcesses || [];
	}
}

export class BusinessService extends ArchiMateElement {
	constructor(id, name, documentation,businessActors,businessRoles,businessProcesses) {
		super(id, name, documentation);
		this.businessActors = businessActors || [];
		this.businessRoles = businessRoles || [];
		this.businessProcesses = businessProcesses || [];
	}
}

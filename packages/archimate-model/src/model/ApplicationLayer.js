
const {ArchiMateElement}=require("./Base.js");
export class ApplicationComponent extends ArchiMateElement {
	constructor(id, name, documentation, interfaces = [], collaborations = [], functions = []) {
		super(id, name, documentation);
		this.interfaces = interfaces;
		this.collaborations = collaborations;
		this.functions = functions;
	}
}

export class ApplicationInterface extends ArchiMateElement {
	constructor(id, name, documentation, communicationNetwork) {
		super(id, name, documentation);
		this.communicationNetwork = communicationNetwork;
	}
}

export class ApplicationCollaboration extends ArchiMateElement {
	constructor(id, name, documentation, interactionProcessEvents = []) {
		super(id, name, documentation);
		this.interactionProcessEvents = interactionProcessEvents;
	}
}

export class ApplicationFunction extends ArchiMateElement {
	constructor(id, name, documentation, services = []) {
		super(id, name, documentation);
		this.services = services;
	}
}

export class ApplicationInteraction extends ArchiMateElement {
	constructor(id, name, documentation, source, target, trigger, response) {
		super(id, name, documentation);
		this.source = source;
		this.target = target;
		this.trigger = trigger;
		this.response = response;
	}
}

export class ApplicationProcess extends ArchiMateElement {
	constructor(id, name, documentation, events = [], services = []) {
		super(id, name, documentation);
		this.events = events;
		this.services = services;
	}
}
export class ApplicationEvent extends ArchiMateElement {
	constructor(id, name, documentation, events = [], services = []) {
		super(id, name, documentation);
	}
}

export class ApplicationService extends ArchiMateElement {
	constructor(id, name, documentation, inputs = [], outputs = []) {
		super(id, name, documentation);
		this.inputs = inputs;
		this.outputs = outputs;
	}
}

export class ApplicationDataObject extends ArchiMateElement {
	constructor(id, name, documentation, dataType, data) {
		super(id, name, documentation);
		this.dataType = dataType;
		this.data = data;
	}
}

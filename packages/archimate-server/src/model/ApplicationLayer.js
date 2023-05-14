const ArchiMateElement = require("./Base.js");

class ApplicationComponent extends ArchiMateElement {
	interfaces;
	collaborations;
	functions;
	/**
	 *
	 * @param id {int}
	 * @param name {string}
	 * @param documentation {string}
	 * @param interfaces {ApplicationInterface[]}
	 * @param collaborations {ApplicationCollaboration[]}
	 * @param functions {ApplicationFunction[]}
	 */
	constructor(id, name, documentation, interfaces = [], collaborations = [] = [], functions = []) {
		super(id, name, documentation);
		this.interfaces = interfaces;
		this.collaborations = collaborations;
		this.functions = functions;
	}
}

class ApplicationInterface extends ArchiMateElement {
	communicationNetwork;
	constructor(id, name, documentation, communicationNetwork = "netwrok") {
		super(id, name, documentation);
		this.communicationNetwork = communicationNetwork;
	}
}

class ApplicationCollaboration extends ArchiMateElement {
	interactionProcessEvents;
	/**
	 *
	 * @param id
	 * @param name
	 * @param documentation
	 * @param interactionProcessEvents
	 */
	constructor(id, name, documentation, interactionProcessEvents = []) {
		super(id, name, documentation);
		this.interactionProcessEvents = interactionProcessEvents;
	}
}

class ApplicationFunction extends ArchiMateElement {
	services;
	/**
	 *
	 * @param id
	 * @param name
	 * @param documentation
	 * @param services {ApplicationService}
	 */
	constructor(id, name, documentation, services = []) {
		super(id, name, documentation);
		this.services = services;
	}
}

class ApplicationInteraction extends ArchiMateElement {
	source;
	target;
	triger;
	response;
	constructor(id, name, documentation, source = "", target = "", triger = "", response = "") {
		super(id, name, documentation);
		this.source = source;
		this.target = target;
		this.triger = triger;
		this.response = response;
	}
}

class ApplicationProcess extends ArchiMateElement {
	events;
	services;
	constructor(id, name, documentation, events = [], services = []) {
		super(id, name, documentation);
		this.events = events;
		this.services = services;
	}
}

class ApplicationEvent extends ArchiMateElement {
	constructor(id, name, documentation) {
		super(id, name, documentation);
	}
}

class ApplicationService extends ArchiMateElement {
	constructor(id, name, documentation, inputs = [], outputs = []) {
		super(id, name, documentation);
		this.inputs = inputs;
		this.outputs = outputs;
	}
}

class ApplicationDataObject extends ArchiMateElement {
	dataType;
	data;
	constructor(id, name, documentation, dataType = "", data = "") {
		super(id, name, documentation);
		this.dataType = dataType;
		this.data = data;
	}
}

module.exports = {
	ArchiMateElement,
	ApplicationCollaboration,
	ApplicationComponent,
	ApplicationDataObject,
	ApplicationEvent,
	ApplicationFunction,
	ApplicationInteraction,
	ApplicationInterface,
	ApplicationProcess,
	ApplicationService
}

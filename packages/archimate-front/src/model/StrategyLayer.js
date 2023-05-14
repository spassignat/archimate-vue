import {ArchiMateElement} from "./Base.js"
export class StrategyResource extends ArchiMateElement {
	constructor(id,name, description, events, capabilities) {
		super(id,name, description);
		this.events = events;
		this.capabilities = capabilities;
	}
}

export class StrategyCapability extends ArchiMateElement {
	constructor(id,name, description, processes) {
		super(id,name, description);
		this.processes = processes;
	}
}

export class StrategyValueStream extends ArchiMateElement {
	constructor(id,name, description, stages, flows) {
		super(id,name, description);
		this.stages = stages;
		this.flows = flows;
	}
}

export class StrategyOutcome extends ArchiMateElement {
	constructor(id,name, description, valueStreams, goals) {
		super(id,name, description);
		this.valueStreams = valueStreams;
		this.goals = goals;
	}
}

export class StrategyGoal extends ArchiMateElement {
	constructor(id,name, description, outcomes) {
		super(id,name, description);
		this.outcomes = outcomes;
	}
}

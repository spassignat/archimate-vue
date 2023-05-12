import {ArchiMateElement} from "./Base.js"
export class StrategyResource extends ArchiMateElement {
	constructor(name, description, events, capabilities) {
		super(name, description);
		this.events = events;
		this.capabilities = capabilities;
	}
}

export class StrategyCapability extends ArchiMateElement {
	constructor(name, description, processes) {
		super(name, description);
		this.processes = processes;
	}
}

export class StrategyValueStream extends ArchiMateElement {
	constructor(name, description, stages, flows) {
		super(name, description);
		this.stages = stages;
		this.flows = flows;
	}
}

export class StrategyOutcome extends ArchiMateElement {
	constructor(name, description, valueStreams, goals) {
		super(name, description);
		this.valueStreams = valueStreams;
		this.goals = goals;
	}
}

export class StrategyGoal extends ArchiMateElement {
	constructor(name, description, outcomes) {
		super(name, description);
		this.outcomes = outcomes;
	}
}

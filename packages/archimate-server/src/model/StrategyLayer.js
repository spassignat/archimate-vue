const ArchiMateElement = require("./Base.js");
class StrategyResource extends ArchiMateElement {
	constructor(id,name, description, events, capabilities) {
		super(id,name, description);
		this.events = events;
		this.capabilities = capabilities;
	}
}

class StrategyCapability extends ArchiMateElement {
	constructor(id,name, description, processes=[]) {
		super(id,name, description);
		this.processes = processes;
	}
}

class StrategyValueStream extends ArchiMateElement {
	constructor(id,name, description, stages, flows) {
		super(id,name, description);
		this.stages = stages;
		this.flows = flows;
	}
}

class StrategyOutcome extends ArchiMateElement {
	constructor(id,name, description, valueStreams, goals) {
		super(id,name, description);
		this.valueStreams = valueStreams;
		this.goals = goals;
	}
}

class StrategyGoal extends ArchiMateElement {
	constructor(id,name, description, outcomes) {
		super(id,name, description);
		this.outcomes = outcomes;
	}
}

module.exports={StrategyCapability,StrategyGoal,StrategyOutcome,StrategyResource,StrategyValueStream}

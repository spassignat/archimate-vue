const Common = require('./Base.js');
const ApplicationLayer = require('./ApplicationLayer.js');
const BusinessLayer = require('./BusinessLayer.js');
const ImplementationLayer = require('./ImplementationLayer.js');
const MotivationLayer = require('./MotivationLayer.js');
const StrategyLayer = require('./StrategyLayer.js');
const TechnologyLayer = require('./TechnologyLayer.js');

module.exports= {...Common, ...ApplicationLayer, ...BusinessLayer, ...ImplementationLayer, ...MotivationLayer,
	...StrategyLayer, ...TechnologyLayer};

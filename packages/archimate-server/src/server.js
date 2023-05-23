const Logger = require("js-logger");
var mySQLLogger = Logger.get("MySQL");
var serverLogger = Logger.get("Server");

function initLoggers() {
	Logger.useDefaults();
	mySQLLogger.setLevel(Logger.INFO);
	serverLogger.setLevel(Logger.DEBUG);
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const handler = require("./mysql_handler.js");
const Layers = require("./generated_model.json");
// const Layers = require("./model.json");
const isLocalStorage = false; // true pour utiliser localstorage, false pour utiliser mysql
const classes = [];
const tableToClass = {};
const app = express();
const router = express.Router();

function expandReferences() {
	serverLogger.info("Pre process model")
	Layers.packages.forEach(p => {
		p.classes.forEach(c => {
			serverLogger.info(" + class: " + c.name);
			let ps = [];
			c.properties.forEach(p => {
				let item = null;
				if (p instanceof Object) {
					item = p;
				} else {
					item = JSON.parse(JSON.stringify(Layers.properties.filter(q => q.name === p)[0]));
				}
				ps.push(item);
				serverLogger.info(`  - property: ${p.name}`);
			});
			c.properties = ps;
			let ls = [];
			c.links.forEach(p => {
				let item = null;
				if (p instanceof Object) {
					item = p;
				} else {
					item = JSON.parse(JSON.stringify(Layers.links.filter(q => q.name === p)[0]));
					if (item.target.type === "#self") {
						item.target.type = c.name;
					}
				}
				ls.push(item);
				serverLogger.info(`  - link: ${item.name} -> ${item.target.type}`);
			});
			c.links = ls;
		})
	});
	serverLogger.debug(Layers);
}

/*
replace property name by property object
 */
function indexTableClass() {
	Layers.packages.reduce((acc, v) => {
		acc.push(...Object.values(v.classes));
		return acc;
	}, classes);
	classes.reduce((acc, val) => {
		acc[camelToSnake(val.name)] = val;
		return acc;
	}, tableToClass);
}

function installSchema() {
	classes.forEach(cl => {
		let tableName = camelToSnake(cl.name);
		createStub(tableName).installTable();
	});
	classes.forEach(cl => {
		let tableName = camelToSnake(cl.name);
		createStub(tableName).installLinks();
	});
}

function camelToSnake(str) {
	return str.replace(/[A-Z]/g, (letter, index) => {
		return index === 0 ? letter.toLowerCase() : `_${letter.toLowerCase()}`;
	});
}

function snakeToCamel(str) {
	return str.replace(/([-_]\w)/g, function (match) {
		return match[1].toUpperCase();
	});
}

/**
 *
 * @param tableName
 * @returns {MysqlHandler}
 */
function createStub(tableName) {
	let stub;
	if (isLocalStorage) {
		// stub = new LocalStorageHandler(className);
	} else {
		stub = new handler.MysqlHandler(tableToClass[tableName], camelToSnake, snakeToCamel);
	}
	return stub;
}

function prepareRouter() {
	router.all('/*', (req, res, next) => {
		serverLogger.debug(req.method + ": " + req.originalUrl);
		next(); // pass control to the next handler
		serverLogger.debug(" - done");
	})
	router.get('/:table', async (req, res) => {
		const table = req.params.table;
		const fields = req.query.fields;
		const query = req.query.query;
		const result = await createStub(table).findAll(fields, query);
		res.send(result);
	});
	router.get('/:table/:id', async (req, res) => {
		const table = req.params.table;
		const fields = req.query.fields;
		const id = req.params.id;
		const result = await createStub(table).findOneById(id, fields);
		res.send(result);
	});
	router.post('/:table', async (req, res) => {
		const table = req.params.table;
		const item = req.body;
		const result = await createStub(table).insertOne(item);
		res.send(result);
	});
	router.put('/:table/:id', async (req, res) => {
		const table = req.params.table;
		const data = req.body;
		const result = await createStub(table).updateOne(data);
		res.send(result);
	});
	router.delete('/:table/:id', async (req, res) => {
		const table = req.params.table;
		const id = req.params.id;
		const result = await createStub(table).deleteOneById(id);
		res.send(result);
	});
	router.get('/', async (req, res) => {
		const result = Layers;
		res.send(result);
	});
}

initLoggers();
expandReferences();
indexTableClass();
installSchema();
prepareRouter();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
const port = process.env.PORT || 3000;
app.listen(port, () => serverLogger.debug(`Server listening on port ${port}`));

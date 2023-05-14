const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const handler = require("./mysql_handler.js");
const Layers = require("./model/index.js");
const isLocalStorage = false; // true pour utiliser localstorage, false pour utiliser mysql
const classes = [];
classes.push(...Object.values(Layers).filter((cls) => typeof cls === 'function'));
const tableToClass = {};
classes.reduce((acc, val) => {
	acc[camelToSnake(val.name)] = val;
	return acc;
}, tableToClass);
classes.forEach(cl => {
	let tableName = camelToSnake(cl.name);
	createStub(tableName).generateSqlSchema();
});

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

const app = express();
app.use(bodyParser.json());
app.use(cors());
const router = express.Router();
router.get('/:table', async (req, res) => {
	const table = req.params.table;
	const result = await createStub(table).findAll();
	res.send(result);
});
router.get('/:table/:id', async (req, res) => {
	const table = req.params.table;
	const id = req.params.id;
	const result = await createStub(table).findOneById(id);
	res.send(result);
});
router.post('/:table', async (req, res) => {
	const table = req.params.table;
	const item = req.body;
	const result = await createStub(table).insertOne(item);
	res.send(result);
});
router.delete('/:table/:id', async (req, res) => {
	const table = req.params.table;
	const id = req.params.id;
	const result = await createStub(table).deleteOneById(id);
	res.send(result);
});
app.use('/api', router);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

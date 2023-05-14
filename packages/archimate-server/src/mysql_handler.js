const mysql = require('mysql');
const uuid = require('uuid');
const sequence = uuid.v4;

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

var types = ['string', 'number'];
var primaryKey = `id`;

class MysqlHandler {
	constructor(classConstructor, mapToDb, mapToObject) {
		this.classConstructor = classConstructor;
		this.table = camelToSnake(classConstructor.name);
		this.mapToDb = mapToDb;
		this.mapToObject = mapToObject;
		let data = new classConstructor();
		this.fields = Object.keys(data).filter(k => types.includes(typeof data[k]));
	}
	generateSqlSchema() {
		let obj = new this.classConstructor();
		const columns = [];
		this.fields.filter(f => f !== primaryKey).forEach(f => {
			const col = this.mapToDb(f);
			const type = getTypeString(obj[f]);
			const columnDef = `${col} ${type}`;
			columns.push(columnDef);
		});
		const columnsString = columns.join(', ');
		const sql = `CREATE TABLE IF NOT EXISTS ${this.table}
                     (
                         ${primaryKey} VARCHAR(255) PRIMARY KEY,
                         ${columnsString}
                     );`;
		MysqlHandler.connection.query(sql, (error, results) => {
			console.info(sql);
			if (error) {
				console.error(error);
			} else {
				console.info(results);
			}
		});
	}
	insertOne(data) {
		data['id'] = sequence();
		const columns = [];
		const values = [];
		this.fields.forEach(f => {
			const col = this.mapToDb(f);
			let value = data[f];
			if (typeof value === 'string') {
				value = `'${value}'`;
			} else if (typeof value === 'number') {
				value = value;
			} else if (value instanceof Date) {
				value = `'${value.toISOString()}'`;
			} else {
				value = 'NULL';
			}
			columns.push(col);
			values.push(value);
		});
		const columnsString = columns.join(', ');
		const valuesString = values.join(', ');
		const sql = `INSERT INTO ${this.table} (${columnsString}) VALUES (${valuesString})`;
		console.trace(sql);
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				console.info(sql);
				if (error) {
					console.error(error);
					reject(error);
				} else {
					console.info(results);
					resolve(data['id']);
				}
			});
		});
	}
	updateOne(data) {
		const id = data.id;
		delete data.id;
		const sets = [];
		this.fields.filter(f => f !== primaryKey).forEach(f => {
			const col = this.mapToDb(f);
			let value = data[f];
			if (typeof value === 'string') {
				sets.push(`${col}='${value}'`)
			} else if (typeof value === 'number') {
				sets.push(`${col}=${value}`)
			} else if (value instanceof Date) {
				sets.push(`${col}='${value.toISOString()}'`)
			} else {
				sets.push(`${col}=NULL`)
			}
		});
		const sql = `UPDATE ${this.table} SET ${sets} WHERE id = '${id}'`;
		console.trace(sql);
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				console.info(sql);
				if (error) {
					console.error(error);
					reject(error);
				} else {
					console.info(results);
					resolve(results.affectedRows > 0);
				}
			});
		});
	}
	findOneById(id) {
		const sql = `SELECT * FROM ${this.table} WHERE id = '${id}' LIMIT 1`;
		console.trace(sql);
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				console.info(sql);
				if (error) {
					console.error(error);
					reject(error);
				} else {
					console.info(results);
					if (results) {
						const updatedData = {
							...results,
							id
						};
						const transformedData = this.transformObjectKeys(updatedData, this.mapToObject);
						resolve(transformedData);
					} else {
						resolve(null);
					}
				}
			});
		});
	}
	findAll() {
		const sql = `SELECT * FROM ${this.table}`;
		console.trace(sql);
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				console.info(sql);
				if (error) {
					console.error(error);
					reject(error);
				} else {
					console.info(results);
					const transformedRows = results.map(row => this.transformObjectKeys(row, this.mapToObject));
					resolve(transformedRows);
				}
			});
		});
	}
	deleteOneById(id) {
		const sql = `DELETE FROM ${this.table} WHERE id = '${id}'`;
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				console.info(sql);
				if (error) {
					console.error(error);
					reject(error);
				} else {
					console.info(results);
					resolve(results.affectedRows > 0);
				}
			});
		});
	}
	transformObjectKeys(obj, transformFunc) {
		const transformedObj = {};
		for (const [key, value] of Object.entries(obj)) {
			const transformedKey = transformFunc(key);
			transformedObj[transformedKey] = value;
		}
		return transformedObj;
	}
}

MysqlHandler.connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Password1!',
	database: 'archimate'
});

function getTypeString(value) {
	const type = typeof value;
	switch (type) {
		case 'string':
			return 'VARCHAR(255)';
		case 'number':
			return 'DECIMAL(10,2)';
		case 'boolean':
			return 'BOOLEAN';
		case 'object':
			if (value instanceof Date) {
				return 'DATETIME';
			}
			break;
		default:
			return null;
	}
}

module.exports = {MysqlHandler}

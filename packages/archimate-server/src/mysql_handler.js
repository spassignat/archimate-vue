const mysql =require( 'mysql');
const v4=require( 'uuid') ;

const uuid=v4;

class MysqlHandler {
	constructor(table, mapToDb, mapToObject) {
		this.table = tableName;
		this.mapToDb = mapToDb;
		this.mapToObject = mapToObject;
	}

	insertOne(data) {
		data['id']=  uuid();
		let columns = Object.keys(data).join(', ').map(this.mapToDb);
		let values = Object.values(data).map(value => {
			if (typeof value === 'string') {
				return `'${value}'`;
			} else if (typeof value === 'number') {
				return value;
			} else if (value instanceof Date) {
				return `'${value.toISOString()}'`;
			} else {
				return null;
			}
		}).join(', ');
		const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(data['id']);
				}
			});
		});
	}

	updateOne(data) {
		const id = data.id;
		delete data.id;
		const sets = Object.entries(data).map(([key, value]) => {
			if (typeof value === 'string') {
				return `${this.mapToDb(key)}='${value}'`;
			} else if (typeof value === 'number') {
				return `${this.mapToDb(key)}=${value}`;
			} else if (value instanceof Date) {
				return `${this.mapToDb(key)}='${value.toISOString()}'`;
			} else {
				return null;
			}
		}).filter(entry => entry !== null).join(', ');
		const sql = `UPDATE ${this.table} SET ${sets} WHERE id=${id}`;
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results.affectedRows > 0);
				}
			});
		});
	}

	findOneById(id) {
		const sql = `SELECT * FROM ${this.table} WHERE id=${id} LIMIT 1`;
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				if (error) {
					reject(error);
				} else {
					if (results) {
						const updatedData = { ...results, id };
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
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				if (error) {
					reject(error);
				} else {
					const transformedRows = results.map(row => this.transformObjectKeys(row, this.mapToObject));
					resolve(transformedRows);
				}
			});
		});
	}

	deleteOneById(id) {
		const sql = `DELETE FROM ${this.table} WHERE id=${id}`;
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				if (error) {
					reject(error);
				} else {
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
	user: 'user',
	password: 'password',
	database: 'database'
});
function generateSqlSchema(classConstructor) {
	const tableName = classConstructor.name.toLowerCase();
	const columns = [];
	for (const property of Object.getOwnPropertyNames(classConstructor.prototype)) {
		if (property !== 'constructor' && typeof classConstructor.prototype[property] !== 'function') {
			const snakeCaseName = camelToSnake(property);
			const type = getTypeString(classConstructor.prototype[property]);
			const columnDef = `${snakeCaseName} ${type}`;
			columns.push(columnDef);
		}
	}
	const columnsString = columns.join(', ');
	const primaryKey = `${tableName}_id`;
	const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${primaryKey} INT AUTO_INCREMENT PRIMARY KEY, ${columnsString});`;
	return sql;
}


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
			break;
	}
	throw new Error(`Unsupported data type: ${type}`);
}


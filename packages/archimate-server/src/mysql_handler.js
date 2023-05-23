const mysql = require('mysql');
const uuid = require('uuid');
const sequence = uuid.v4;
const Logger = require("js-logger");
var mySQLLogger = Logger.get("MySQL")

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

function makeTableName(aClass) {
	let split = camelToSnake(aClass).split('_');
	return split[0].charAt(0) + '_' + split.splice(1).join('_');
}

var types = ['string', 'number'];
var primaryKey = `id`;

function makeLinkTableName(table, l) {
	const ltable = `${table}_${camelToSnake(l.relationship).substring(0, 3)}_${makeTableName(l.target.type)}`;
	return ltable;
}

class MysqlHandler {
	constructor(aClass, mapToDb, mapToObject) {
		this.aClass = aClass;
		this.table = makeTableName(aClass.name);
		this.mapToDb = mapToDb;
		this.mapToObject = mapToObject;
	}
	newInstance() {
		let item = {};
		this.aClass.properties.reduce((acc, a) => {
			acc[a.name] = "null";
			return acc;
		}, item);
		this.aClass.links.reduce((acc, a) => {
			acc[a.name] = [];
			return acc;
		}, item)
		return item;
	};
	installTable() {
		let obj = this.newInstance();
		const columns = [];
		this.aClass.properties.filter(f => f.name !== primaryKey).forEach(f => {
			const col = this.mapToDb(f.name);
			const type = f.storage;
			const columnDef = `${col} ${type}`;
			columns.push(columnDef);
		});
		const columnsString = columns.join(', ');
//@formatter:off
		const sql = `CREATE TABLE IF NOT EXISTS ${this.table}(
                               ${primaryKey} VARCHAR(64) PRIMARY KEY, ${columnsString} );`;
		//@formatter:on
		MysqlHandler.connection.query(sql, (error, results) => {
			this.logSQL(sql, error, results);
		});
	}
	logSQL(sql, error, results) {
		if (error) {
			mySQLLogger.error(sql);
			mySQLLogger.error(error);
		} else {
			mySQLLogger.debug(sql);
			mySQLLogger.debug(results);
		}
	}
	installLinks() {
		this.aClass.links.forEach(l => {
			const ltable = makeLinkTableName(this.table, l);
			mySQLLogger.info("create link table " + ltable);
			let fk = "";
			if (l.target.type !== "" && l.target.type.indexOf("%") < 0) {
				fk = `FOREIGN KEY (target) REFERENCES ${makeTableName(l.target.type)}(${primaryKey}),`;
			}
//@formatter:off
			const sql = `CREATE TABLE IF NOT EXISTS ${ltable}(
                                   SOURCE VARCHAR(64) NOT NULL,
                                   target VARCHAR(64) NOT NULL,
                                   FOREIGN KEY (SOURCE) REFERENCES ${this.table}(${primaryKey}),
                                   ${fk}
                                   PRIMARY KEY(SOURCE,target));`;
//@formatter:on
			MysqlHandler.connection.query(sql, (error, results) => {
				this.logSQL(sql, error, results);
			});
		});
	}
	insertOne(data) {
		data[primaryKey] = sequence();
		const columns = [];
		const values = [];
		this.aClass.properties.forEach(f => {
			const col = this.mapToDb(f.name);
			let value = data[f.name];
			if (f.type === 'string') {
				value = `'${value}'`;
			} else if (f.type === 'number') {
				value = value;
			} else if (f.type === 'date') {
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
		mySQLLogger.debug(sql);
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				if (error) {
					mySQLLogger.error(error);
					reject(error);
				} else {
					mySQLLogger.debug(results);
					this.aClass.links.forEach(l => {
						const ltable = `${this.table}_${camelToSnake(l.name)}`;
						if (data[l.name]) {
							data[l.name].forEach(v => {
								const sql = `INSERT INTO ${ltable} (source, target) VALUES ('${data[primaryKey]}', '${v[primaryKey]}')`;
								MysqlHandler.connection.query(sql, (error, results) => {
									this.logSQL(sql, error, results);
								});
							});
						}
						resolve(data['id']);
					});
				}
			});
		});
	}
	updateOne(data) {
		const id = data.id;
		delete data.id;
		const sets = [];
		this.aClass.properties.filter(f => f.name !== primaryKey).forEach(f => {
			const col = this.mapToDb(f.name);
			let value = data[f.name];
			if (f.type === 'string') {
				sets.push(`${col}='${value}'`)
			} else if (f.type === 'number') {
				sets.push(`${col}=${value}`)
			} else if (f.type === 'date') {
				sets.push(`${col}='${value.toISOString()}'`)
			} else {
				sets.push(`${col}=NULL`)
			}
		});
		const sql = `UPDATE ${this.table} SET ${sets} WHERE ${primaryKey} = '${id}'`;
		mySQLLogger.debug(sql);
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				if (error) {
					mySQLLogger.error(sql);
					mySQLLogger.error(error);
					reject(error);
				} else {
					mySQLLogger.debug(sql);
					mySQLLogger.debug(results);
					this.aClass.links.forEach(l => {
						const ltable = `${this.table}_${camelToSnake(l.name)}`;
						const sql = `DELETE FROM ${ltable} WHERE source = '${id}'`;
						MysqlHandler.connection.query(sql, (error, results) => {
							if (error) {
								mySQLLogger.error(sql);
								mySQLLogger.error(error);
								reject(error);
							} else {
								mySQLLogger.debug(sql);
								mySQLLogger.debug(results);
							}
						});
						if (data[l.name]) {
							data[l.name].forEach(v => {
								const sql = `INSERT INTO ${ltable} (source, target) VALUES ('${id}', '${v}')`;
								MysqlHandler.connection.query(sql, (error, results) => {
									if (error) {
										mySQLLogger.error(sql);
										mySQLLogger.error(error);
										reject(error);
									} else {
										mySQLLogger.debug(sql);
										mySQLLogger.debug(results);
									}
								});
							});
						}
						resolve(results.affectedRows > 0);
					});
				}
			});
		});
	}
	findOneById(id, fields = "name") {
		let strings = fields.split(",");
		const projection = this.aClass.properties.filter(p => strings.includes(p.name)||p.name===primaryKey).map(p => {
			return this.mapToDb(p.name);
		});
		const sql = `SELECT ${projection} FROM ${this.table} WHERE ${primaryKey} = '${id}' LIMIT 1`;
		const lnks = this.aClass.links.filter(p => fields.includes(p.name));
		let promises = lnks.map(l => {
			mySQLLogger.debug(l);
			const ltable = makeLinkTableName(this.table, l);
			let aClass = l.target.type;
			if (l.relationship === "composition") {
				//join and fetch all fields
				const ttable = makeTableName(aClass);
				const sql = `SELECT t.*
                             FROM ${ltable} l
                                      JOIN ${ttable} t ON t.${primaryKey} = l.source
                             WHERE l.source = '${id}'`;
				return new Promise((resolve, reject) => {
					MysqlHandler.connection.query(sql, (error, children) => {
						if (error) {
							mySQLLogger.error(l);
							mySQLLogger.error(sql);
							mySQLLogger.error(error);
							reject(error);
						} else {
							mySQLLogger.debug(sql);
							mySQLLogger.debug(children);
							const res={};
							res[l.name] = children.map(x => {
								const b = this.transformObjectKeys(x, this.mapToObject);
								delete b.source;
								delete b.target;
								return b;
							});
							resolve(res);
						}
					});
				});
			} else {
				//fetch only id
				const sql = `SELECT l.* FROM ${ltable} l WHERE l.source = '${id}'`;
				return new Promise((resolve, reject) => {
					MysqlHandler.connection.query(sql, (error, children) => {
						if (error) {
							mySQLLogger.error(l);
							mySQLLogger.error(sql);
							mySQLLogger.error(error);
							reject(error);
						} else {
							mySQLLogger.debug(sql);
							mySQLLogger.debug(children);
							const res={};
							res[l.name] = children.map(x => {
								return x[primaryKey];
							});
							resolve(res);
						}
					});
				});
			}
		});
		let objProm = new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				if (error) {
					mySQLLogger.error(sql);
					mySQLLogger.error(error);
					reject(error);
				} else {
					mySQLLogger.debug(sql);
					mySQLLogger.debug(results);
					if (results) {
						const updatedData = {
							...results[0],
							id
						};
						resolve(this.transformObjectKeys(updatedData, this.mapToObject));
					}
					resolve(null);
				}
			});
		});
		promises.push(objProm);
		let promise = new Promise((resolve, reject) => {
			Promise.all(promises).then((res) => {

				let result=	res.reduce((acc,obj)=>{
					acc={...acc,...obj};
					return acc;
				},{});
				resolve(result);
			}).catch((err) => {
				reject(err);
			});
		});
		return promise;
	}
	findAll(fields = "name", query) {
		let strings = fields.split(",");
		const projection = this.aClass.properties.filter(p => strings.includes(p.name)||p.name===primaryKey).map(p => {
			return this.mapToDb(p.name);
		});
		const sql = `SELECT ${projection} FROM ${this.table}`;
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				if (error) {
					mySQLLogger.error(sql);
					mySQLLogger.error(error);
					reject(error);
				} else {
					mySQLLogger.debug(sql);
					mySQLLogger.debug(results);
					const transformedRows = results.map(row => this.transformObjectKeys(row, this.mapToObject));
					resolve(transformedRows);
				}
			});
		});
	}
	deleteOneById(id) {
		const sql = `DELETE FROM ${this.table} WHERE ${primaryKey} = '${id}'`;
		return new Promise((resolve, reject) => {
			MysqlHandler.connection.query(sql, (error, results) => {
				if (error) {
					mySQLLogger.error(sql);
					mySQLLogger.error(error);
					reject(error);
				} else {
					mySQLLogger.debug(sql);
					mySQLLogger.debug(results);
					const lnks = this.aClass.links;
					lnks.forEach(l => {
						const ltable = makeLinkTableName(this.table, l);
						const sql = `DELETE FROM ${ltable} l WHERE source = '${id}'`;
						MysqlHandler.connection.query(sql, (error, children) => {
							if (error) {
								mySQLLogger.error(sql);
								mySQLLogger.error(error);
								reject(error);
							} else {
								mySQLLogger.debug(sql);
								mySQLLogger.debug(children);
							}
						});
					});
					resolve(true);
				}
			});
		});
	}
	transformObjectKeys(obj, transformFunc, newParam = {}) {
		const transformedObj = newParam;
		Object.keys(obj).forEach(key => {
			const transformedKey = transformFunc(key);
			transformedObj[transformedKey] = obj[key];
		});
		return transformedObj;
	}
}

MysqlHandler.connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Password1!',
	database: 'archimate'
});
module.exports = {MysqlHandler}

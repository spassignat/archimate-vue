const fs = require('fs');
const model = require('./model.json');
const sqlite3 = require('sqlite3').verbose();

// Open a new SQLite database connection
const db = new sqlite3.Database('./model.sqlite');

// Loop over each entity in the model
Object.keys(model).forEach(layerName => {
	const layerEntities = model[layerName];

	layerEntities.forEach(entity => {
		// Create a table for the entity
		const createTableQuery = `CREATE TABLE IF NOT EXISTS ${entity.name} (
      ${entity.properties.map(property => `${property.name} ${getDataType(property.type)}`).join(', ')}
    )`;
		db.run(createTableQuery);

		// Loop over each link in the entity
		Object.keys(entity.links).forEach(linkName => {
			const link = entity.links[linkName];

			// Create a table for the link, with foreign key references to the two entities it links
			const tableName = `${entity.name}_${link.type}_${linkName}`;
			const createLinkTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
        ${entity.name}_id INTEGER NOT NULL,
        ${link.entity}_id INTEGER NOT NULL,
        FOREIGN KEY(${entity.name}_id) REFERENCES ${entity.name}(id),
        FOREIGN KEY(${link.entity}_id) REFERENCES ${link.entity}(id)
      )`;
			db.run(createLinkTableQuery);
		});
	});
});

function getDataType(type) {
	// Map property types to SQLite data types
	switch (type) {
		case 'string':
			return 'TEXT';
		case 'number':
			return 'REAL';
		case 'boolean':
			return 'INTEGER';
		case 'ApplicationComponent':
		case 'BusinessActor':
		case 'BusinessObject':
		case 'BusinessProcess':
		case 'BusinessRole':
		case 'Contract':
		case 'DataObject':
		case 'Deliverable':
		case 'Device':
		case 'DistributionNetwork':
		case 'Driver':
		case 'Equipment':
		case 'Facility':
		case 'Goal':
		case 'Location':
		case 'Material':
		case 'Outcome':
		case 'Plateau':
		case 'Product':
		case 'Representation':
		case 'Resource':
		case 'Stakeholder':
		case 'SystemSoftware':
		case 'Value':
			return 'INTEGER'; // Foreign key reference to the related entity
		default:
			throw new Error(`Unknown property type: ${type}`);
	}
}

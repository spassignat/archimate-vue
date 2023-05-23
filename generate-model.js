const fs = require('fs');
const model = require('./model.json');
// Generate a class for each element
for (const entity of model.entities) {
	const className = entity.name;
	const classProps = entity.properties;
	const properties = entity.properties.map(p => `${p.name};`).join('\n');
	const ps= entity.properties.map(p => `${p.name}`).join(',');
	const classExtends = entity.extends;
	let imps = "";
	if (classExtends&&classExtends.length>0) {
		imps = classExtends.reduce((acc, val) => {
			acc += "import " + val + " from " + val + ".js";
			return acc;
		}, "");
	}
	const classFileContent = `
		${imps}
      	class ${className} ${classExtends&&classExtends.length>0 ? 'extends ' + classExtends : ''} {
        	constructor(${ps}) {
          		${classExtends&&classExtends.length>0?'super(props);':''}
          		${classProps.map(prop => `this.${prop.name} = ${prop.name};`).join('\n')}
        	}
      	}
      	module.exports = { ${className} };`;
	fs.writeFileSync(`generated/${className}.js`, classFileContent);
}

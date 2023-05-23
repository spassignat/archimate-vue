const fs = require('fs');
const xml2js = require('xml2js');
const _ = require("lodash");
// Read the XML file
const Layers = require("./model.json");
// Convert XML to JSON
const keyRelationship = {};

function applyLinkRules(cl) {
	/*var numArray = [1, 2, 3, 4, 5, NaN]
	var toRemove = [4, 5, NaN];
	removedArray = numArray.filter(function(el) {
		return !toRemove.includes(el);
	});*/

	cl.links = cl.links || [];
	const toRemove = cl.links.filter(t => (t.relationship === "Composition" && t.target.type !== "#self")
		||(t.relationship === "Aggregation" && t.target.type !== "#self")
		||(t.relationship === "Specialization" && t.target.type !== "#self"));
	// cl.links=cl.links.filter(el=>!toRemove.includes(el));
	cl.links.filter(t => t.relationship === "Assignment").forEach(r => {
		r.aspect = "Active";
		r.target.aspect = "Behavior"
	});
	cl.links.filter(t => t.relationship === "Serving").forEach(r => {
		r.aspect = "Active|Behavior";
		r.target.aspect = "Active|Behavior"
	});
	cl.links.filter(t => t.relationship === "Access").forEach(r => {
		r.aspect = "Active|Behavior";
		r.target.aspect = "Passive"
	});
	cl.links.filter(t => t.relationship === "Influence").forEach(r => {
		r.target.type = "Motivation%"
	});
	cl.links.filter(t => t.relationship === "Triggering").forEach(r => {
		r.aspect = "Behavior";
		r.target.aspect = "Behavior"
	});
	cl.links.filter(t => t.relationship === "Flow").forEach(r => {
		r.aspect = "Active|Behavior";
		r.target.aspect = "Active|Behavior"
	});
}

function generify() {
	Layers.packages.forEach(p1 => {
		p1.classes.forEach(cl1 => {
			for (let i1 = 0; i1 < cl1.links.length; i1++) {
				const l1=cl1.links[i1];
				if(typeof l1 === "object"){
					Layers.packages.forEach(p2 => {
						p2.classes.filter(c => c.name !== cl1.name).forEach(cl2 => {
							for (let i2 = 0; i2 < cl2.links.length; i2++) {
								const l2=cl2.links[i2];
								if (_.isEqual(l1, l2)) {
									console.info(`Generify ${p1.name}/${cl1.name}/${l1.name}`);
									let newVar = {...l1};
									newVar.name = (newVar.relationship + newVar.target.type).replace('%', "");
									Layers.links.push(newVar);
									cl2.links.splice(i2, 1);
									cl2.links.push(newVar.name);
									cl1.links.splice(i1, 1);
									cl1.links.push(newVar.name);
								}
							}
						});
					});
				}
			}
		});
	});
}

function cleanDuplicates() {
	Layers.links = _.uniqWith(Layers.links, _.isEqual);
	Layers.properties = _.uniqWith(Layers.properties, _.isEqual);
	Layers.packages.forEach(p1 => {
		p1.classes.forEach(cl1 => {
			cl1.links = _.uniqWith(cl1.links, _.isEqual);
			cl1.properties = _.uniqWith(cl1.properties, _.isEqual);
		});
	});
}

function addGenericProperties(cl) {
	cl.properties = [...Layers.properties, ...cl.properties || []];
}

function normalizeClassName(cl, pname, name) {
	if (!cl.name.startsWith(pname)) {
		Layers.links.filter(l => l.target === cl.name).forEach(l => {
			l.target.type = name;
		});
		Layers.packages.forEach(p => {
			p.classes.forEach(c => {
				c.links.filter(l => l.target === cl.name).forEach(l => {
					l.target.type = name;
				});
			});
		})
		cl.name = name;
	}
}

function normalizeModel() {
	Layers.links = Layers.links || [];
	Layers.packages = Layers.packages || [];
	Layers.properties = Layers.properties || [];
	Layers.packages.forEach(p1 => {
		p1.classes.forEach(cl1 => {
			addGenericProperties(cl1);
			cl1.links = cl1.links || [];
		});
	});
}

function loadRelationships() {
	const keys = fs.readFileSync('./meta-relationship-keys.xml', 'utf8');
	const parser = new xml2js.Parser();
	parser.parseString(keys, (err, result) => {
		result.relationshipskeys.key.reduce((acc, v) => {
			acc[v.$.char] = v.$.relationship.slice(0, -"Relationship".length);
			return acc;
		}, keyRelationship)
	});
}

/**
 * generate a reflective relationship for each relations
 * @param source
 * @param target
 */
function addSelfRelationship(source, target) {
	Layers.packages.forEach(p => {
		p.classes.filter(c => c.name === source.$.concept).forEach(cl => {
			Array.from(target.$.relations).forEach(ch => {
				const r = keyRelationship[ch];
				let lname = "self" + r;
				let length = Layers.links.filter(l=>l.name===lname).length;
				if(length===0){
					//create the relation and add it to the global links
					Layers.links.push({
						"name": lname,
						"label": r.toLowerCase(),
						"relationship": r,
						"target": {
							"form": "transfer",
							"aspect": "",
							"type": "#self"
						},
						"aspect": ""
					});
				}
				// add the relation to the class
				cl.links.push(lname);
			});
		});
	});
}

/**
 * generate relationships for each relations
 * @param rel
 * @param target
 */
function addRelationship(rel, target) {
	Layers.packages.forEach(p => {
		p.classes
			.filter(c => c.name === rel.$.concept)
			.forEach(cl => {
				Array.from(target.$.relations)
					.forEach(ch => {
						const r = keyRelationship[ch];
						if (cl.links.filter(l => l.name === "self" + r).length === 0) {
							cl.links.push({
								"name": r.toLowerCase().substring(0, 4) + '_' + target.$.concept,
								"label": r.toLowerCase(),
								"relationship": r,
								"target": {
									"form": "transfer",
									"aspect": "",
									"type": target.$.concept
								},
								"aspect": ""
							})
						}
					});
			});
	});
}

function main() {
	normalizeModel();
	loadRelationships();
	const xmlData = fs.readFileSync('./relationships.xml', 'utf8');
	const parser = new xml2js.Parser();
	parser.parseString(xmlData, (err, result) => {
		if (err) {
			console.error('Error parsing XML:', err);
			return;
		}
		result.relationships.source.forEach(rel => {
			rel.target.forEach(target => {
				if (rel.$.concept === target.$.concept) {
					addSelfRelationship(rel, target);
				} else {
					addRelationship(rel, target);
				}
			});
		});
		//apply rules from https://emmanuelgeorjon.com/architecture/archimate_relationships/
		applyLinkRules(Layers);
		let linkNames = Layers.links.map(l => l.name);
		Layers.packages.forEach(p => {
			p.classes.forEach(cl => {
				normalizeClassName(cl, p.name, p.name + cl.name);
				cl.properties = cl.properties.concat([...Layers.properties]);
				applyLinkRules(cl);
				cl.links = cl.links.filter(t => (typeof t === "string" && linkNames.includes(t)) || typeof t !== "string");
			});
		});
		//generify
		generify();
		cleanDuplicates();
		// Convert JSON to string
		const jsonString = JSON.stringify(Layers, null, 2);
		// Write the JSON to a file
		fs.writeFileSync('./generated_model.json', jsonString, 'utf8');
		console.log('Conversion completed successfully!');
	});
}

main();

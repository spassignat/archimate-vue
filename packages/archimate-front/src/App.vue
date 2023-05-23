<template>
	<el-container>
		<el-aside width="200px">
			<el-tree @node-click="handleNodeClick" :data="data" :props="defaultProps"/>
		</el-aside>
		<el-tabs>
			<el-tab-pane label="Data">

				<ArchimateComponent v-if="aClass" :api-url="apiUrl" :context="this.camelToSnake(aClass.name)" :entity="aClass" :fields="aClass.fields" :link="aLink"/>
			</el-tab-pane>
			<el-tab-pane  label="Diagram">
				<UML :uml="uml"></UML>
			</el-tab-pane>
		</el-tabs>
	</el-container>
</template>
<script>
// import { ApplicationLayer, BusinessLayer, ImplementationLayer, MotivationLayer, StrategyLayer, TechnologyLayer} from "@exygen/archimate-model";
import ArchimateComponent from "./components/ArchimateComponent.vue";
import axios from "axios";
import _ from "lodash";
import UML from "./components/UML.vue";

function compareNode(a, b) {
	return a.label.localeCompare(b.label);
}

export default {
	components: {
		UML,
		ArchimateComponent,
	},
	data() {
		return {
			uml: "@startuml\nbob -> sam\n@enduml",
			model: {packages: []},
			aClass: null,
			aLink: null,
			defaultProps: {
				children: 'children',
				label: 'label',
			},
			layers: {},
			apiUrl: "http://localhost:3000/api"
		};
	},
	created() {
		axios.get(`${this.apiUrl}/`).then(response => {
			this.model = response.data || {};
		}).catch(err => {
		}).finally(() => {
		});
		// this.groupClassesByLayer(ApplicationLayer, "Application")
		// this.groupClassesByLayer(BusinessLayer, "Business")
		// this.groupClassesByLayer(ImplementationLayer, "Implementation")
		// this.groupClassesByLayer(MotivationLayer, "Motivation")
		// this.groupClassesByLayer(StrategyLayer, "Strategy")
		// this.groupClassesByLayer(TechnologyLayer, "Technology")
	},
	computed: {
		data() {
			return this.model.packages.map(p => {
				return {
					label: p.name,
					type: 'Layer',
					children: p.classes.map(c => {
						return {
							label: c.name,
							type: 'Class',
							aClass: c,
							children: c.links.reduce((acc, v) => {
								acc.push(v.relationship);
								acc = _.uniqWith(acc, _.isEqual)
								return acc;
							}, []).map(a => {
								return {
									label: a,
									type: "Relation",
									aClass: c,
									children: c.links.filter(l => l.relationship === a).map(l => {
										return {
											label: l.target.type,
											type: 'Link',
											aClass: c,
											aLink: l
										};
									}).sort(compareNode)
								};
							}).sort(compareNode)
						};
					}).sort(compareNode)
				};
			}).sort(compareNode)
		},
	},
	methods: {
		handleNodeClick(node) {
			console.log(node.type);
			switch (node.type) {
				case "Layer":
					this.aClass = null;
					this.aLink = null;
					break;
				case "Link":
					this.aLink = node.aLink;
				case "Relation":
				case "Class":
					this.aClass = node.aClass;
					break;
			}
		},
		snakeToCamel(str) {
			return str.replace(/([-_]\w)/g, function (match) {
				return match[1].toUpperCase();
			});
		},
		camelToSnake(str) {
			return str.replace(/[A-Z]/g, (letter, index) => {
				return index === 0 ? letter.toLowerCase() : `_${letter.toLowerCase()}`;
			});
		},
		groupClassesByLayer(acls, layer) {
			let classList = Object.values(acls).filter((cls) => typeof cls === 'function')
			// Parcours de toutes les classes et regroupement par couche
			for (const pos in classList) {
				// console.log(className);
				const classDef = classList[pos];
				if (!this.layers[layer]) {
					this.layers[layer] = {
						name: layer,
						classes: []
					};
				}
				const obj = new classDef;
				this.layers[layer].classes.push({
					name: classDef.name,
					context: camelToSnake(classDef.name),
					classDef: classDef,
					fields: Object.getOwnPropertyNames(obj)
				});
			}
			// Retourne un tableau des couches trié par ordre alphabétique
			return Object.values(this.layers).sort((a, b) => a.name.localeCompare(b.name));
		}
	}
};
</script>
<style>
.el-container {
	margin: 10px;
//background: #a0cfff; border: solid #A0CFFF;
}

.el-main {
	border: solid #B3E19D;
	margin: 10px;
}

.el-header {
	border: solid #FAB6B6;
	margin: 10px;
}

.el-footer {
	border: solid #FFFF00;
	margin: 10px;
}

.aside {
	border: solid #D9ECFF;
	margin: 10px;
}
</style>

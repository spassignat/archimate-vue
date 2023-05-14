<template>
	<div>
		<el-tabs>
			<el-tab-pane v-for="layer in layers" :label="layer.name">
				<el-tabs v-model="activeTab">
					<el-tab-pane v-for="aClass in layer.classes" :key="aClass.name" :label="aClass.name">
						<ArchimateComponent :api-url="apiUrl"
											:context="aClass.context"
											:entity="aClass.classDef" :entity-name="aClass.name" :fields="aClass.fields"/>
					</el-tab-pane>
				</el-tabs>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
// import { ApplicationLayer, BusinessLayer, ImplementationLayer, MotivationLayer, StrategyLayer, TechnologyLayer} from "@exygen/archimate-model";
import * as ApplicationLayer from "./model/ApplicationLayer.js";
import * as BusinessLayer from "./model/BusinessLayer.js";
import * as ImplementationLayer from "./model/ImplementationLayer.js";
import * as MotivationLayer from "./model/MotivationLayer.js";
import * as StrategyLayer from "./model/StrategyLayer.js";
import * as TechnologyLayer from "./model/TechnologyLayer.js";
import ArchimateComponent from "./components/ArchimateComponent.vue";

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
export default {
	components: {
		ArchimateComponent,
	},
	data() {
		return {
			activeTab: "ApplicationComponent",
			layers: {},
			apiUrl: "http://localhost:3000/api"
		};
	},
	created() {
		this.groupClassesByLayer(ApplicationLayer, "Application")
		this.groupClassesByLayer(BusinessLayer, "Business")
		this.groupClassesByLayer(ImplementationLayer, "Implementation")
		this.groupClassesByLayer(MotivationLayer, "Motivation")
		this.groupClassesByLayer(StrategyLayer, "Strategy")
		this.groupClassesByLayer(TechnologyLayer, "Technology")
	},
	methods: {
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

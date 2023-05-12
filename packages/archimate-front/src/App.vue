<template>
	<div>
		<el-tabs>
			<el-tab-pane v-for="layer in layers" :label="layer.name">
				<el-tabs v-model="activeTab">
					<el-tab-pane v-for="aClass in layer.classes" :key="aClass.name" :label="aClass.name">
						<ArchimateComponent :api-url="apiUrl" :entity="aClass.classDef" :entity-name="aClass.name" :fields="aClass.fields"/>
					</el-tab-pane>
				</el-tabs>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import TechnologyLayer from "packages/archimate-model";
import ApplicationLayer from "packages/archimate-model";
import BusinessLayer from "packages/archimate-model";
import ImplementationLayer from "packages/archimate-model";
import MotivationLayer from "packages/archimate-model";
import StrategyLayer from "packages/archimate-model";
import ArchimateComponent from "./components/ArchimateComponent.vue";

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

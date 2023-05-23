<template>
	<el-header><h1>{{ entity.name }}</h1></el-header>
	<el-main>
		<el-row>
			<el-col>
				<el-row>
					<el-table :data="entities" style="width: 100%">
						<el-table-column v-for="(field, index) in entity.properties.filter(p=>p.listed)" :key="index" :label="field.name" width="180">
							<template #default="scope">
								<div style="display: flex; align-items: center">
									<span style="margin-left: 10px">{{ scope.row[field.name] }}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column align="right">
							<template #header>
								<el-row>
									<el-col :span="12">
										<el-input v-model="search" placeholder="Type to search" size="small"/>
									</el-col>
									<el-col :span="1">
										<el-button :disabled="isDisabled" :loading="isLoading" size="small" type="primary" @click="onRefresh">Load</el-button>
									</el-col>
								</el-row>
								<div></div>
							</template>
							<template #default="scope">
								<el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
								<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
								<el-button size="small" type="success" @click="handleSave(scope.row)">Save</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item label="Names">
							<el-input v-model="toCreate" type="textarea"></el-input>
						</el-form-item>
					</el-col>
					<el-col>
						<el-button :disabled="isDisabled" :loading="isLoading" type="success" @click="handleCreateAll">Create</el-button>
						<el-button type="info" @click="onAddItem">Add Item</el-button>
					</el-col>
				</el-row>
			</el-col>
			<el-container v-if="formData">
				<el-header>
					<h2>{{ formData.name }}</h2>
				</el-header>
				<el-main>
					<el-form ref="form" :model="formData" label-width="120px">
						<el-row>
							<el-col v-for="(field, index) in entity.properties" :key="index" :span="24 / columns">
								<el-form-item :label="field.name">
									<el-input v-if="field.form.startsWith('input')" v-model="formData[field.name]" :disabled="field.disabled||field==='id'" :type="field.form.substring(6)"></el-input>
									<el-select v-if="field.form.startsWith('select')" v-model="formData[field.name]" :disabled="field.disabled||field==='id'" :type="field.form.substring(6)">
										<el-option v-for="item in field.options" :key="item" :label="item" :value="item"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="link">
							<el-col :span="24 / columns">
								<el-form-item :label="link.name">
									<el-transfer v-model="formData[link.name]"
												 :data="linksOptions[link.target.type]"
												 :filter-method="filterMethod"
												 :filter-placeholder="link.name"
												 :props="{ key: 'key', label: 'label'}"
												 :titles="['Options','Selected']"
												 filterable></el-transfer>
									<el-button :disabled="isDisabled" :loading="isLoading" type="primary" @click="reloadLink(link)">Refresh</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-main>
				<el-footer>
					<div class="text-center">
						<el-button :disabled="isDisabled" :loading="isLoading" type="success" @click="handleSave">Save</el-button>
						<!--			<el-button v-if="isUpdating" @click="cancelUpdate">Cancel</el-button>-->
					</div>
				</el-footer>
			</el-container>
		</el-row>
	</el-main>
</template>
<script>
import axios from "axios";

export default {
	name: "ArchimateComponent",
	props: {
		apiUrl: String,
		context: String,
		entity: Object,
		link: Object,
		model: Array,
		columns: Array
	},
	data() {
		return {
			theClass: {},
			selectedEntity: {},
			entities: [],
			linksOptions: {},
			formData: {},
			search: "",
			isLoading: false,
			isCreating: false,
			isUpdating: false,
			isDeleting: false,
			isDisabled: false,
			error: null,
			toCreate: ""
		};
	},
	methods: {
		filterMethod(query, item) {
			try {
				return item.label.toLowerCase().includes(query.toLowerCase())
			} catch (e) {
				return false;
			}
		},
		handleCreateAll() {
			this.toCreate.split(" ").forEach(nme => {
				this.handleSave({"name": nme});
			})
		},
		handleDelete(index, data) {
			this.isDeleting = true;
			axios.delete(`${this.apiUrl}/${this.context}/${data.id}`).then(() => {
				this.entities = this.entities.filter((e) => e.id !== data.id);
			}).catch((err) => {
				this.error = err;
			}).finally(() => {
				this.isDeleting = false;
			});
		},
		handleEdit(index, data) {
			this.isLoading = true;
			const props = this.entity.properties.map(x => x.name).concat(this.entity.links.map(x => x.name)).join(',');
			axios.get(`${this.apiUrl}/${this.context}/${data.id}?fields=${props}`).then((res) => {
				this.formData = res.data;
			}).catch((err) => {
				this.error = err;
			}).finally(() => {
				this.isLoading = false;
			});
		},
		onRefresh() {
			this.loadData();
		},
		handleSave() {
			if (!this.formData.id) {
				this.isCreating = true;
				axios.post(`${this.apiUrl}/${this.context}`, this.formData).then(() => {
					this.isCreating = false;
				}).catch(err => {
					this.error = err;
				}).finally(() => {
					this.isCreating = false;
				});
			} else {
				this.isUpdating = true;
				axios.put(`${this.apiUrl}/${this.context}/${this.formData.id}`, this.formData).then(() => {
					this.isUpdating = false;
				}).catch(err => {
					this.error = err;
				}).finally(() => {
					this.isUpdating = false;
				});
			}
		},
		onAddItem() {
			let item = {};
			this.entity.properties.reduce((acc, a) => {
				acc[a.name] = "null";
				return acc;
			}, item);
			this.entity.links.reduce((acc, a) => {
				acc[a.name] = [];
				return acc;
			}, item)
			this.entities.push(item);
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
		loadData() {
			this.isLoading = true;
			const props = this.entity.properties.filter(f => f.listed).map(x => x.name).join(',');
			axios.get(`${this.apiUrl}/${this.camelToSnake(this.entity.name)}?fields=${props}`).then(response => {
				this.entities = response.data || [];
			}).catch(err => {
				this.error = err;
			}).finally(() => {
				this.isLoading = false;
			});
		},
		reloadLink(link) {
			if (link.target.type.endsWith('%')) {
				return;
			}
			this.isLoading = true;
			let that = this;
			axios.get(`${this.apiUrl}/${that.camelToSnake(link.target.type)}?fields=id,name`).then(response => {
				that.linksOptions[link.target.type] = (response.data || []).map(a => {
					return {
						key: a.id,
						label: a.name
					};
				});
			}).catch(err => {
				that.error = err;
			}).finally(() => {
				that.isLoading = false;
			});
		}
	},
	created() {
		this.theClass = this.entity;
		this.loadData();
		/*
				this.entity.links.forEach(l => {
					this.reloadLink(l);
				});
		*/
	}
};
</script>
<style scoped></style>

<template>
	<div>
		<el-form ref="form" :model="formData" label-width="120px">
			<el-table :data="entities" style="width: 100%">
				<el-table-column v-for="(field, index) in fields" :key="index" :label="field" width="180">
					<template #default="scope">
						<div style="display: flex; align-items: center">
							<!--							<el-icon><timer /></el-icon>-->
							<span style="margin-left: 10px">{{ scope.row[field] }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column align="right">
					<template #header>
						<el-input v-model="search" placeholder="Type to search" size="small"/>
					</template>
					<template #default="scope">
						<el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
						<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
						<el-button size="small" type="success" @click="handleSave(scope.$index, scope.row)">Save</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-button type="primary"  @click="onAddItem">Add Item
			</el-button>
			<el-row>
				<el-col v-for="(field, index) in fields" :key="index" :span="24 / columns">
					<el-form-item :label="field">
						<el-input v-model="formData[field]" :disabled="field.disabled"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--		<div class="text-center">-->
		<!--			<el-button :disabled="isDisabled" :loading="isLoading" type="primary" @click="onSubmit">Save</el-button>-->
		<!--			<el-button v-if="isUpdating" @click="cancelUpdate">Cancel</el-button>-->
		<!--		</div>-->
	</div>
</template>
<script>
import axios from "axios";

export default {
	name: "ArchimateComponent",
	props: {
		apiUrl: String,
		entityName: String,
		entity: Function,
		fields: Array,
		columns: Array
	},
	data() {
		return {
			selectedEntity: {},
			entities: [],
			formData: {},
			search: "",
			isLoading: false,
			isCreating: false,
			isUpdating: false,
			isDeleting: false,
			isDisabled: false,
			error: null,
		};
	},
	methods: {
		handleDelete(index, data) {
			try {
				this.isDeleting = true;
				axios.delete(`${this.apiUrl}/${this.cl}/${id}`);
				this.entities = state.entities.filter((e) => e.id !== id);
			} catch (err) {
				this.error = err;
			} finally {
				this.isDeleting = false;
			}
		},
		handleEdit(index, data) {
			this.formData = data;
		},
		onSubmit() {
		},
		handleSave(index, data) {
			if (!data.id) {
				try {
					this.isCreating = true;
					const response = axios.post(this.apiUrl, data);
					this.entities.push(response.data);
					this.selectedEntity = {};
				} catch (err) {
					this.error = err;
				} finally {
					this.isCreating = false;
				}
			} else {
				try {
					this.isUpdating = true;
					axios.put(`${this.apiUrl}/${state.selectedEntity.id}`, state.selectedEntity);
				} catch (err) {
					this.error = err;
				} finally {
					this.isUpdating = false;
				}
			}
		},
		onAddItem() {
			let items = new this.entity();
			this.entities.push(items);
		},
		loadData() {
			try {
				this.isLoading = true;
				const response = axios.get(this.apiUrl);
				this.entities = response.data;
			} catch (err) {
				this.error = err;
			} finally {
				this.isLoading = false;
			}
		}
	},
	created() {
		this.loadData();
	}
};
</script>
<style scoped></style>

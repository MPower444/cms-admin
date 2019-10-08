<template>

	<el-card class="box-card">
		<div slot="header">
			<el-tree :props="defaultProps" lazy :load="loadNode" ref="tree">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" size="mini" @click.stop="() => openEditModal(node,data)" icon="el-icon-edit">
							编辑
						</el-button>
						<el-button type="text" size="mini" @click.stop="() => openInsertModal(node,data)" icon="el-icon-plus">
							添加
						</el-button>
						<el-button type="text" size="mini" @click.stop="() => remove(node, data)" icon="el-icon-delete">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</div>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button type="primary" @click="append">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="父类名称" label-width="120px">
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.category_id">
							<span style="float: left">{{ item.name }}</span>
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click="edit">编 辑</el-button>
			</div>
		</el-dialog>
	</el-card>

</template>

<script>
	import { Category } from '@/api/index'

	export default {
		data() {
			return {
				options: [],
				defaultProps: {
					label: 'name'
				},
				insertModalShow: false,
				insertForm: {
					name: '',
					id: '',
				},
				node: '', //节点数据
				editForm: {
					name: '',
					parent_id: '',
				},
				value: '', //选择框父类id
				editModalShow: false,
			}
		},
		methods: {
			openInsertModal(node, data) {
				this.node = node; //转存节点node
				this.insertForm.parent_id = data.category_id;
				this.insertModalShow = true;
			},
			async append() {
				let { status, data } = await Category.insert({ ...this.insertForm });
				if (status) {
					// 获取转存node
					let category_id = this.node.data.id;
					this.$refs.tree.append({ ...this.insertForm, category_id }, this.node)
					// this.nodeData.children.push({ ...this.insertForm, category_id });
					this.insertModalShow = false;
					// 提示信息
					this.$message({
						type: 'success',
						message: '添加成功!'
					});
					// 添加表单置空
					this.insertForm.name = '';
					this.insertForm.parent_id = '';
				}

			},
			async openEditModal(node, data1) {
				this.node = node;
				this.editForm = { ...data1, id: data1.category_id || '无' };
				this.editModalShow = true;
				let { status, data } = await Category.list();
				this.options = data;
			},
			async edit() {
				this.editForm.parent_id = this.value;
				let { status, msg } = await Category.edit({ ...this.editForm });
				if (status) {
					this.node.data = this.editForm;
					this.$message({
						type: 'success',
						message: '编辑成功!'
					});
					this.editModalShow = false;
				} else {
					this.$message({
						message: '编辑失败！',
						type: 'warning'
					});
				}
			},
			async remove(node, data1) {

				let id = data1.category_id;
				let { status, data } = await Category.subCate({ id })
				if (data.length == 0) {
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(async () => {
						let { status, msg } = await Category.del({ id });
						if (status) {
							node.remove();
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				} else {
					this.$message({
						message: '请先删除子节点！',
						type: 'warning'
					});
				}

			},
			async loadNode(node, resolve) {
				if (node.level == 0) {
					return resolve([{ category_id: 0, name: "全部分类" }]);
				}
				if (node.level > 0) {
					let id = node.data.category_id;
					let { status, data } = await Category.subCate({ id })
					resolve(data);
				}

			},

		}
	};
</script>

<style>
	.box-card {
		width: 1100px;
		padding: 30px;
	}

	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>

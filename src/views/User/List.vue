<template>

	<el-main>
		<el-table :data="tableData">
			<el-table-column prop="id" label="#" width="80">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="140">
			</el-table-column>
			<el-table-column prop="fullname" label="昵称" width="100">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="80">
			</el-table-column>
			<el-table-column prop="tel" label="手机" width="180">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="180">
			</el-table-column>
			<el-table-column prop="avatar" label="头像" width="140">
				<template slot-scope="scope">
					<el-image style="width: 50px;" :src="scope.row.avatar"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="operate" label="操作" width="180">
				<template slot-scope="scope">
					<router-link :to="{ name : 'UserEdit' , params : { id : scope.row.id } }">
						<el-button type="primary" plain>编辑</el-button>
					</router-link>
					<el-button type="primary" @click='deleteHandle(scope.row.id)' style="margin-left: 10px;">删除</el-button>
					<!-- 第二种方式 -->
					<!-- <el-link :href = "`#/user/edit/${scope.row.id}`" type="primary" plain >
						<el-button type="primary" plain>编辑</el-button>
					</el-link> -->
				</template>


			</el-table-column>
		</el-table>
	</el-main>

</template>

<script>
	import { Admin } from '@/api/index'
	export default {
		data() {
			return {
				tableData: [],

			}

		},
		methods: {
			async loadList() {
				let { status, data } = await Admin.list();
				if (status) {
					this.tableData = data;
				}

			},
			deleteHandle(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let res = Admin.remove({ id: id });
					this.$message({
						type: 'success',
						message: '删除成功'
					})
					this.loadList();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		},
		created() {
			this.loadList();
		}
	};
</script>

<style>
</style>

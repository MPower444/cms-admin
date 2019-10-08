<template>
	<el-main>
		<el-table :data="tableData">
			<el-table-column prop="article_id" label="#" width="100">
			</el-table-column>
			<el-table-column prop="category_id" label="版块" width="100">
			</el-table-column>
			<el-table-column prop="main_photo" label="主图" width="100">
				<template slot-scope="scope">
					<el-image style="width: 50px;" :src="scope.row.main_photo"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="230">
			</el-table-column>
			<el-table-column prop="create_time" label="发布日期" width="200">
			</el-table-column>
			<el-table-column prop="update_time" label="更新日期" width="200">
			</el-table-column>
			<el-table-column prop="operate" label="操作" width="200">
				<template slot-scope="scope">
					<el-link :href="`#/article/edit/${scope.row.article_id}`" type="primary" plain>
						<el-button type="primary" plain>编辑</el-button>
					</el-link>
					<el-button @click='deleteHandle(scope.row.article_id)' type="primary" style="margin-left: 10px;">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-main>
</template>

<script>
	import { Article } from '@/api/index'

	export default {
		data() {

			return {
				tableData: []
			}
		},
		methods: {
			async loadList() {
				var pagesize = 5;
				var pageindex = 1;
				let { status, msg, data } = await Article.list({ pagesize, pageindex });
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
					let res = Article.del({ id: id });
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

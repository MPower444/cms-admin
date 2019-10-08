<template>
	<div class="SideBar">
		<el-aside width="240px" style="background-color: rgb(238, 241, 246)">
			<el-menu router>
				<el-submenu index="1">
					<template slot="title"><i class="el-icon-message"></i>信息面板</template>
					<el-menu-item-group>
						
						<el-menu-item index="1-1">信息列表</el-menu-item>
						<el-menu-item index="1-2">添加信息</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-menu"></i>文章管理</template>
					<el-menu-item-group>
						
						<el-menu-item index="/Article/List">文章列表</el-menu-item>
						<el-menu-item index="/Article/Release">添加文章</el-menu-item>
					</el-menu-item-group>

				</el-submenu>
				<el-submenu index="3">
					<template slot="title"><i class="el-icon-setting"></i>栏目管理</template>
					<el-menu-item-group>
						<el-menu-item index="/Category/List">栏目列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title"><i class="el-icon-s-order"></i>公告管理</template>
					<el-menu-item-group>
						
						<el-menu-item index="3-1">公告列表</el-menu-item>
						<el-menu-item index="3-2">添加公告</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title"><i class="el-icon-s-comment"></i>评论管理</template>
					<el-menu-item-group>
						
						<el-menu-item index="3-1">评论列表</el-menu-item>
						<el-menu-item index="3-2">添加评论</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="6">
					<template slot="title"><i class="el-icon-s-check"></i>用户管理</template>
					<el-menu-item-group>

						<el-menu-item index="/User/Group">用户组</el-menu-item>
						<el-menu-item index="/User/List">用户列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>
	</div>

</template>

<script>
	export default {
		data: function() {
			return {
				data: [
					
				]
			}
		},
		watch: {
			$route() {
				if (this.$route.meta.parentPath) {
					this.pagedefault = this.$route.meta.parentPath; // 实现路由切换
				}
			}
		},

	}
</script>

<style>
	.SideBar {
		width: 240px;
		min-height: calc(100vh - 41px);
		color: white;
	}

	.el-aside {
		width: 100%;
		color: #333;
		background: skyblue;
	}
</style>

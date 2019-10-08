<template>
	<div class="NavBar">
		<span class="title">CMS管理系统</span>
		<div class="user-control">
			<span class="admin">admin</span>
		</div>
		
		
	</div>
</template>

<script>

</script>

<style lang="scss" scoped="scoped">
	.NavBar {
		height: 41px;
		width: 100%;
		background: #000000;
		color: white;
	}

	.title {
		font-size: 18px;
		color: whitesmoke;
		line-height: 41px;
		margin-left: 30px;
	}
	.user-control{
		float: right;
		margin-right: 30px;
		line-height: 41px;
	}
	.admin{
		cursor: pointer;
	}
</style>

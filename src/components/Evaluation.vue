<template>
	<div class="evaluation">
		<div class="starBox">
			<ul class="star clearfix">
				<li v-for="(item,index) in stars" ><img :class="{imghover:item.show}" @mouseenter="appear(index)" src="@/assets/123.png" alt=""></li>
			</ul>
		</div>
		<ul class="msg">
			<li v-for="(item,index) in msg" v-show="item.open">{{item.tip}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: ['show'],
		data:function () {
			return {
				stars:[{
					show:false,
				},
				{
					show:false,
				},
				{
					show:false,
				},
				{
					show:false,
				},
				{
					show:false,
				}],
				msg:[{
					tip:"非常差回去再练练",
					open:false,
				},{
					tip:"真的是差，都不忍心说你",
					open:false,
				},{
					tip:"一般还过的去吧",
					open:false,
				},{
					tip:"很好，是我想要的东西",
					open:false,
				},{
					tip:"太完美了，此物只应天上有，人家哪得几回闻！",
					open:false,
				},
				]
			}
		},
		methods:{
			appear:function (i) {
				this.stars.forEach(function (item,index) {
					item.show = false;
					if (index<=i) {
						item.show = true;
					}
				})
				this.msg.forEach(function (item,index) {
					item.open = false;
					if (index == i) {
						item.open = true;
					}
				})
			}
		}
	}
</script>

<style>
	.evaluation{
		width: 500px;
		height: 100px;
		padding: 50px;
		margin: 0 auto;
		border: 1px solid black;
	}
	.clearfix::after{
		content: "";
		clear: both;
	}
	.starBox{
		height: 20px;
	}
	.star li{
		width: 24px;
		height: 20px;
		overflow: hidden;
		float: left;
		position: relative;
	}
	.star li img{
		position: absolute;
		top: 0;
		left: 0;
	}
	.star li img.imghover{
		top: -25px;
	}
	.msg{
		width: 300x;
		height: 50px;
		overflow: hidden;
		position: relative;
	}
	.msg li{
		position: absolute;
		top: 0;
		left: 100px;
		width: 300x;
		height: 50px;
	}
</style>

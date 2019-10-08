<template>
	<div class="counterBox">
		<button class="btn left" :disabled="count == 1" type="button" @click="reduceHandle">-</button>
		<input type="text" v-model="count" class="num" />
		<button class="btn right" type="button" @click="count++">+</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				count: 1,
			}
		},
		methods: {
			reduceHandle() {
				if (this.count > 1) {
					this.count--;
				}
			}
		}
	}
	
</script>

<style lang="scss" scoped="scoped">
	.counterBox {
		display: flex;
		.btn {
			width: 40px;
			background: none;
			border: none;
			border: 1px solid black;
		}
		.num {
			max-width: 40px;
			outline: none;
			text-align: center;
			border: 1px solid black;
		}
		
		.left {
			border-right: none;
		}
		
		.right {
			border-left: none;
		}
	}

	

	
</style>

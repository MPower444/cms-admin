<template>
	<div class="modal-shadow" :class="{active:show}">
		<div class="modal">
			<div class="title">
				{{title}}
				<slot name="title"></slot>
			</div>
			<div class="body">
				{{content}}
				<slot name="content"></slot>
			</div>
			<div class="action">
				<button type="button" @click="$emit('close')">确定</button>
			</div>
			<div class="delete" @click="$emit('close')">X</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['show', 'title', 'content'],
	}
</script>

<style>
	.modal {
		min-width: 400px;
		border: 1px solid #999999;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		z-index: 100;
		background: white;
	}

	.modal .title {
		font-size: 16px;
		padding: 16px 0;
		border-bottom: 1px solid #999999;
	}

	.modal .body {
		padding: 20px 10px;
		font-size: 14px;
		color: #666;
		border-bottom: 1px solid #999999;
	}

	.modal .action {
		padding: 10px;
		text-align: right;
	}

	.modal button {
		padding: 5px 15px;
	}

	.modal-shadow {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		filter: ;
	}

	.modal .delete {
		position: absolute;
		top: 5px;
		right: 10px;
		font-size: 18px;
		cursor: pointer;
	}

	.modal-shadow.active {
		display: block;
	}

	.modal-shadow {
		display: none;
	}
</style>

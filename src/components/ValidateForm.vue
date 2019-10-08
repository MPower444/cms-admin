<template>
	<div id="validateForm">
		<p>表单验证</p>
		<form action="">
			<label for="">
				<input type="text" v-model="username" @input="un" class="input username" placeholder="请输入用户名!">
				<span class="tip" :class="{green:usernameIsTrue}">{{usernametip}}</span>
			</label>
			<label for="">
				<input type="password" v-model="password" @input="pwd" class="input password" placeholder="请输入密码!">
				<span class="tip" :class="{green:passwordIsTrue}">{{passwordtip}}</span>
			</label>
			<label for="" class="codeBox">
				<input type="text" v-model="code" @input="cd" class="input code" placeholder="请输入短信验证码!">
				<input class="codeBtn" @click="getCode" type="button" :disabled="isDisabled" v-model="codetip">
				<span class="tip" :class="{green:codeIsTrue}">{{codemsg}}</span>
			</label>
			<p>
				<input type="checkbox" :checked="isChecked" @click="isChecked = !isChecked">
				<a href="javascript:void(0);">同意用户使用协议</a>
			</p>
			<button type="button" :disabled="allready" id="register" @click>注册</button>
		</form>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				username: "",
				usernametip: "",
				usernameIsTrue: false,
				password: "",
				passwordtip: "",
				passwordIsTrue: false,
				code: "",
				codetip: "获取验证码",
				codeSec: "",
				codeClock:"",
				codemsg:"",
				codeIsTrue: false,
				isChecked:true,
				isDisabled: false,
			}
		},
		methods: {
			un: function() {
				if (this.username.length < 2) {
					this.usernametip = "用户名至少2个字符！";
					this.usernameIsTrue = false;
				} else {
					this.usernametip = "用户名格式正确！";
					this.usernameIsTrue = true;
				}

			},
			pwd: function() {
				var num = /\d/g;
				var eng = /[a-z]/g;
				var zifu = /\W/g;
				var len1 = num.test(this.password);
				var len2 = eng.test(this.password);
				var len3 = zifu.test(this.password);
				if (this.password.length >= 6) {
					if (len1 && len2 && len3) {
						this.passwordtip = "密码强度：高"
						this.passwordIsTrue = true;
					} else if ((len1 && len2 && !len3) || (len1 && !len2 && len3) || (!len1 && len2 && len3)) {
						this.passwordtip = "密码强度：中"
						this.passwordIsTrue = true;
					} else if (len1 || len2 || len3) {
						this.passwordtip = "密码强度：低"
						this.passwordIsTrue = true;
					}
				} else {
					this.passwordtip = "密码至少6个字符！"
					this.passwordIsTrue = false;
				}

			},
			getCode: function() {
				this.isDisabled = true;
				this.codetip = 60;
				window.clearInterval(this.codeClock);
				this.codeClock = window.setInterval(() => {
					if (this.codetip > 0) {
						this.codetip--;
					}else{
						window.clearInterval(this.codeClock);
						this.isDisabled = false;
						this.codetip = "获取验证码";
					}
				}, 1000);
			},
			cd:function () {
				if (!this.code) {
					this.codemsg = "请输入验证码!"
					
				}else{
					this.codemsg = "验证码已输入!"
					this.codeIsTrue = true;
				}
			}
		},
		computed:{
			allready:function () {
				if (this.usernameIsTrue && this.passwordIsTrue && this.codeIsTrue && this.isChecked) {
					return false;
				}else{
					return true;
				}
			}
		}
	}
</script>

<style>
	#validateForm {
		width: 500px;
		background: whitesmoke;
		min-height: 100px;
		border: 1px solid black;
		padding: 20px 50px;
	}

	.input {
		width: 70%;
		padding: 8px;
		/* border: none; */
		outline: none;
		border-radius: 8px;
		margin-bottom: 20px;
	}

	.tip {
		font-size: 11px;
		text-align: left;
		margin-left: 5px;
		color: red;
	}

	.green {
		color: limegreen;
	}

	.codeBox {
		position: relative;
	}

	.codeBtn {
		position: absolute;
		top: 0;
		left: 275px;
		width: 88px;
		height: 25px;
		text-align: center;
	}
	input[type=checkbox]{
		width: 20px;
		height: 20px;
		vertical-align: middle;
	}
	#register{
		width: 100px;
		height: 40px;
	}
</style>

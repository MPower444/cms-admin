<template>
	<div class="banner">
		<div class="bgcolor">
			<el-form ref="form" :model="form" :rules="rules">
				<p style="border-bottom: 1px solid lightgray;font-size: 18px;padding-bottom: 10px;">登录</p>
				<el-form-item prop="username" :span="10" label="账户">
					<el-input v-model="form.username" placeholder="请输入登录用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password" label="密码">
					<el-input type="password" v-model.number="form.password" placeholder="请输入登录密码"></el-input>
				</el-form-item>
				<el-form-item prop="checked">
					<el-checkbox-group v-model="form.checked">
						<el-checkbox label="同意用户使用协议" name="form.checked"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="loginHandle('form')">登录</el-button>
					<el-link @click="registerHandle" style="float: right;">注册账户</el-link>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { Admin } from '@/api/index.js';

	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					checked: [],
				},
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, message: '用户名至少3位', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ pattern: /^[0-9]{3,}$/, message: '密码至少3位', trigger: 'blur' }
					],
					checked: [
						{ type: 'array', required: true, message: '请确认使用协议', trigger: 'blur' }
					],
				}
			}
		},
		methods: {
			async loginHandle(form) {
				// 提取数据
				let formData = { ...this.form };
				// 表单验证
				this.$refs.form.validate(async (valid) => {
					// console.log(valid); //false or true
					if (valid) {
						let { status, msg, data } = await Admin.login(formData);
						if (status) {
							// 存储token
							sessionStorage.token = data.token;
							this.$message({
								showClose: true,
								message: '登录成功!',
								type: 'success',
								duration: 700,
								onClose: () => {
									// push跳转路由
									// this.$router.push('/User/List');
									// replace跳转路由
									this.$router.replace('/User/List');
								}
							});
						} else {
							this.$message({
								showClose: true,
								message: '账号密码错误',
								type: 'error'
							});
						}
					}
				});
			},
			registerHandle: function() {
				this.$router.push('/register');
			}

		},

	}
</script>

<style scoped>
	.banner {
		background-image: url("../../assets/login-bg.jpg");
		height: 100vh;
		background-size: cover;
		position: relative;
	}

	.bgcolor {
		position: absolute;
		top: 180px;
		right: 60px;
		padding: 20px;
		background-color: white;
		width: 380px;
		border-radius: 10px;
	}
</style>

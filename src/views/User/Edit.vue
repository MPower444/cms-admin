<template>
	<el-form :rules="rules" ref="form" :model="form" label-width="100px" style="width: 1100px;padding: 30px;">
		<p style="margin: 0;padding-bottom: 30px;font-size: 20px;">编辑管理员 <span>ID : {{id}}</span></p>
		<el-form-item label="用户名" prop="username">
			<el-input v-model="form.username" placeholder="请输入用户名"></el-input>
		</el-form-item>
		<el-form-item label="姓名" prop="fullname">
			<el-input v-model="form.fullname" placeholder="请输入姓名"></el-input>
		</el-form-item>
		<el-form-item label="性别" prop="sex">
			<el-radio-group v-model="form.sex">
				<el-radio label="男"></el-radio>
				<el-radio label="女"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="手机" prop="tel">
			<el-input v-model="form.tel" placeholder="请输入手机"></el-input>
		</el-form-item>
		<el-form-item label="邮箱" prop="email">
			<el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
		</el-form-item>
		<el-form-item label="头像" prop="avatar">
			<el-upload class="avatar-uploader" :class="{deleteHover:isHover}" action="/upload/common/" :data="{type:'avatar'}"
			 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
				<img v-if="form.avatar" :src="form.avatar" class="avatar">
				<i v-else class="el-icon-plus "></i>
				<div class="deleteHandle" @click="deleteHandle"><i class="el-icon-delete"></i></div>
			</el-upload>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">保存并修改</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import { Admin } from '@/api/index.js'

	export default {
		props: ['id'],
		data() {
			return {
				form: {
					username: '',
					fullname: '',
					sex: '',
					tel: '',
					email: '',
					avatar: '',
				},
				isHover: true,
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, message: '用户名至少3位', trigger: 'blur' },
					],
					fullname: [
						{ required: true, message: '请输入昵称', trigger: 'blur' },
					],
					sex: [
						{ required: true, message: '请选择性别', trigger: 'blur' }
					],
					tel: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
					],
					email: [
						{ required: true, message: '请输入邮箱', trigger: 'blur' },
						{ type: 'email', message: '请输入邮箱正确格式', trigger: 'blur' }
					],
					avatar: [
						{ required: true, message: '请上传头像', trigger: 'blur' },
					]
				},
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.form.avatar = res.data;
				this.isHover = true;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			// 头像删除
			async deleteHandle() {
				if (this.form.avatar == '/images/avatar/default.jpg') {
					this.form.avatar = '';
					this.isHover = false;
				} else {
					let newarr = '.' + this.form.avatar
					this.form.avatar = "";
					this.isHover = false;
					let { status, msg } = await Admin.del({ src: newarr })
					if (status) {
						console.log(msg)
					} else {
						console.log(msg)
					}
				}
			},
			onSubmit() {
				let data = { ...this.form };
				data.id = this.$route.params.id;
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Admin.edit(data);
						this.$message({
							showClose: true,
							message: '修改成功!',
							type: 'success',
							duration: 700,
							onClose: () => {
								// replace跳转路由
								this.$router.replace('/user/list');
							}
						});
					}
				});
			},
			async loadInfo() {
				let { status, data } = await Admin.info({ id: this.id });
				if (status) {
					this.form = data;
					if (this.form.avatar == './img/avatar.jpg') {
						this.form.avatar = '/images/avatar/default.jpg';
					}
					
				}
			},
		},
		created() {
			this.loadInfo();
		}
	}
</script>

<style scoped="scoped">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: 100px;
		height: 100px;
		line-height: 100px;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}

	.avatar {
		width: 100px;
		height: 100px;
		display: block;

	}

	.avatar-uploader {
		position: relative;
		display: inline-block;
	}

	.deleteHover:hover .deleteHandle {
		display: block;
	}

	.deleteHandle {
		position: absolute;
		top: 0;
		left: 0;
		width: 100px;
		height: 100px;
		background: rgba(0, 0, 0, 0.5);
		display: none;
		color: white;
		line-height: 100px;
		font-size: 18px;
	}
</style>

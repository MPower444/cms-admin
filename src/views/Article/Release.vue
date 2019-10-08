<template>
	<el-form :rules="rules" ref="form" :model="form" label-width="100px" style="width: 1100px;padding: 30px;">
		<p style="margin: 0;padding-bottom: 30px;font-size: 20px;">发布文章</p>
		<el-form-item label="标题" prop="title">
			<el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
		</el-form-item>
		<el-form-item label="描述" prop="description">
			<el-input type="textarea" v-model="form.description" placeholder="博客内容的简单摘要"></el-input>
		</el-form-item>
		<el-form-item label="板块">
			<el-select v-model="form.category_id" placeholder="暂无数据">
				<el-option v-for="item in optionsFirst" :key="item.category_id" :label="item.name" :value="item.category_id"></el-option>
			</el-select>
			<el-select v-model="form.cate_2nd" placeholder="暂无数据">
				<el-option v-for="item in optionsSecond" :key="item.category_id" :label="item.name" :value="item.category_id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="主图" prop="main_photo">
			<el-upload class="avatar-uploader" :class="{deleteHover:isHover}" action="/upload/common/" :data="{type:'common'}"
			 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
				<img v-if="form.main_photo" :src="form.main_photo" class="avatar">
				<i v-else class="el-icon-plus "></i>
				<div class="deleteHandle" @click="deleteHandle"><i class="el-icon-delete"></i></div>
			</el-upload>
		</el-form-item>
		<el-form-item label="内容" prop="content">
			<editor-bar v-model="form.content" :isClear="isClear" @change="change"></editor-bar>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">保存并发布</el-button>
			<el-button>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import EditorBar from '../../components/EditorBar.vue'
	import { Article, Category, Admin } from '@/api/index.js'

	export default {
		components: {
			EditorBar,
		},
		data() {
			return {
				form: {
					title: '',
					description: '',
					category_id: '',
					main_photo: '',
					cate_2nd: '',
					content: '',

				},
				rules: {
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' },
					],
					description: [
						{ required: true, message: '请输入描述', trigger: 'blur' },
					],
					main_photo: [
						{ required: true, message: '请插入主图', trigger: 'blur' }
					],
					content: [
						{ required: true, message: '请输入内容', trigger: 'blur' },
					],
				},
				optionsFirst: [],
				optionsSecond: [],
				fileList: [],
				isClear: false,
				isHover: false,
			}
		},
		watch: {
			'form.category_id': function(newValue, oldValue) {
				this.loadCategory_2nd(newValue);
			}
		},
		created() {
			this.loadCategory_1st(0);
		},
		methods: {
			async loadCategory_1st(id) {
				let { status, data } = await Category.subCate({ id })
				if (status) {
					if (data.length > 0) {
						this.form.category_id = data[0].category_id;
					} else {
						this.form.category_id = '';
					}

					this.optionsFirst = data;
				}
			},
			async loadCategory_2nd(id) {
				let { status, data } = await Category.subCate({ id })
				if (status) {
					if (data.length > 0) {
						this.form.cate_2nd = data[0].category_id;
					} else {
						this.form.cate_2nd = '';
					}
					this.optionsSecond = data;

				}
			},
			// 富文本操作
			change(val) {
				this.form.content = val;
			},
			async onSubmit() {
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Article.add({ ...this.form });
						if (status) {
							this.$message({
								type: 'success',
								message: '发布成功!',
								duration: 700,
								onClose: () => {
									this.$router.replace('/Article/List');
								}
							})
						}
					}
				})
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			// 主图上传
			handleAvatarSuccess(res, file) {
				this.form.main_photo = res.data;
				this.isHover = true;
			},
			// 主图删除
			async deleteHandle() {
				let arr = this.form.main_photo.split("")
				arr.shift();
				let newarr = arr.join("");
				// console.log(newarr)
				this.form.main_photo = "";
				this.isHover = false;
				let { status, msg } = await Admin.del({ src: newarr })
				if (status) {
					console.log(msg)
				} else {
					console.log(msg)
				}

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

		}
	}
</script>

<style scoped="scoped">
	p {
		margin: 0;
		padding-bottom: 30px;
		font-size: 20px;
	}

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
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: none;
		color: white;
		line-height: 100px;
		font-size: 18px;
	}
</style>

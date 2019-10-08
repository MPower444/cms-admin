import axios from 'axios';

let login = (data) => axios.post('/admin/login', data);
let register = (data) => axios.post('/admin/register', data);
let list = (data) => axios.get('/admin/list', { params: data });
let info = (data) => axios.get('/admin/info', { params: data });
let edit = (data) => axios.post('/admin/info', data);
let remove = (data) => axios.post('/admin/delete', data);
// 物理删除头像
let del = (data) => axios.post('/upload/delete', data);

export default {
	login,
	register,
	list,
	info,
	edit,
	remove,
	del,
}

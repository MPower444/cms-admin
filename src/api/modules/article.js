import axios from 'axios';

let detail = (data) => axios.get('/article/detail', { params: data });
let list = (data) => axios.get('/article/list', { params: data });
let uploadPath = (data) => axios.post('/upload/editor/', data);
let edit = (data) => axios.post('/article/edit', data);
let add = (data) => axios.post('/article/add', data);
let del = (data) => axios.post('/article/delete', data);

export default {
	detail,
	list,
	uploadPath,
	edit,
	add,
	del,
}

import axios from 'axios';

let subCate = (data) => axios.get('/category/sub', { params: data });
let insert = (data) => axios.post('/category/add', data);
let del = (data) => axios.post('/category/delete', data);
let edit = (data) => axios.post('/category/edit', data);
let list = (data) => axios.get('/category/list', { params: data });


export default {
	subCate,
	insert,
	del,
	edit,
	list,
}

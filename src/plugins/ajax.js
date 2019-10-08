import axios from 'axios'

let post = async (url, formData) => {
	let { data } = await axios.post(url, formData);
	return data;
}
export default {
	post,
}

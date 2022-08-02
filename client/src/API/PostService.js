import axios from "axios";

export default class PostService {

	static async getAll(limit = 10, page = 1) {
		const response = await axios.get('/api/posts', {
			params: {
				limit: limit,
				page: page
			}
		});
		console.log("posts", response.data);
		return response.data;
	}

	static
	async getById(id) {
		const response = await axios.get('/api/posts/' + id);
		console.log("getById", response.data);
		return response.data;
	}

	static
	async getCommentsByPostId(id) {
		const response = await axios.get(`/api/posts/${id}/comments`);
		// console.log("getCommentsById", response.data);
		return response.data;
	}

}
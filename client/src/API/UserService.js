import axios from "axios";

export default class UserService {

	static async getAll(limit = 10, page = 1) {
		const response = await axios.get('/api/users', {
			params: {
				limit: limit,
				page: page
			}
		});
		console.log("users", response.data);
		return response.data;
	}

	static
	async getFullById(id) {
		const response = await axios.get('/api/usersFull/' + id);
		const commentsWrote = await axios.get('/api/users/' + id + '/comments?count');
		const postsDone = await axios.get('/api/users/' + id + '/posts?count');

		let data = {
			...response.data,
			commentsWrote: commentsWrote.data.count,
			postsDone: postsDone.data.count
		};

			console.log("usersFull: getById", data);
		return data;
	}

	static async getById(id) {
		const response = await axios.get('/api/users/' + id);
		console.log("users: getById", response.data);
		return response.data;
	}

	static
	async getUserPosts(userId, limit, page) {
		const response = await axios.get(`/api/users/${userId}/posts`, {
			params: {
				limit: limit,
				page: page
			}
		});

		console.log("userService: getUserPosts", response.data);
		return response.data;
	}

}
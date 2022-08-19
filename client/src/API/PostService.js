import axios from "axios";
import {API_URL} from "../config";

export default class PostService {

	static async getAll(limit = 10, page = 1) {
		const response = await axios.get(`${API_URL}/api/posts`, {
			params: {
				limit: limit,
				page: page
			}
		});
		console.log("posts", response.data);
		return response.data;
	}

	static async getAllForUser(limit = 10, page = 1, userId) {
		const response = await axios.get(`${API_URL}/api/posts`, {
			params: {
				limit: limit,
				page: page,
				owner: true,
				comments: true,
				userId: userId
			}
		});
		console.log("posts", response.data);
		return response.data;
	}

	static async addNewPost(userId, text) {
		const post = {
			text, owner: userId
		};

		const response = await axios.post(`${API_URL}/api/posts`, post);

		return response.data;
	}


	static
	async getById(id) {
		const response = await axios.get(`${API_URL}/api/posts/${id}`);
		console.log("getById", response.data);
		return response.data;
	}

	static
	async getCommentsByPostId(id) {
		const response = await axios.get(`${API_URL}/api/posts/${id}/comments`);
		// console.log("getCommentsById", response.data);
		return response.data;
	}

	static async addLike(postId, userLikedId) {
		const response = await axios.post(`${API_URL}/api/posts/${postId}/likes?add`,
			{
				_id: postId,
				userId: userLikedId
			});
		// console.log("getCommentsById", response.data);
		return response.data;
	}

	static async deleteLike(postId, userLikedId) {
		const response = await axios.post(`${API_URL}/api/posts/${postId}/likes?delete`,
			{
				userId: userLikedId
			});
		// console.log("getCommentsById", response.data);
		return response.data;
	}

}
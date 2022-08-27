import axios from "axios";
import {API_URL} from "../config";

const PostService = {

	getAllForUser: async (userId, limit = 10, page = 1) => {
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
	},

	addNewPost: async (userId, text) => {
		const post = {
			text, owner: userId
		};

		const response = await axios.post(`${API_URL}/api/posts`, post);

		return response.data;
	},

	addLike: async (postId, userLikedId) => {
		const response = await axios.post(`${API_URL}/api/posts/${postId}/likes?add`,
			{
				_id: postId,
				userId: userLikedId
			});
		return response.data;
	},

	deleteLike: async (postId, userLikedId) => {
		const response = await axios.post(`${API_URL}/api/posts/${postId}/likes?delete`,
			{
				userId: userLikedId
			});
		return response.data;
	}

};

export default PostService;
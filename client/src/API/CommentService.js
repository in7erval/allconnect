import axios from "axios";

export default class CommentService {

	static async addComment(postId, userId, text) {

		const response = await axios.post('/api/comments/', {
			postId, userId, text
		});
		console.log("response", response.data);
		return response.data;
	}


}
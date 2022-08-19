import axios from "axios";
import {API_URL} from "../config";

export default class CommentService {

	static async addComment(postId, userId, text) {

		const response = await axios.post(`${API_URL}/api/comments/`, {
			postId, userId, text
		});
		console.log("response", response.data);
		return response.data;
	}


}
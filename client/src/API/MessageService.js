import axios from "axios";
import {API_URL} from "../config";

export default class MessageService {

	constructor() {}

	static async getLastMessage(roomId) {
		const response = await axios.get(`${API_URL}/api/messages`, {
			params: {
				roomId,
				last: true
			}
		});
		console.log("lastMessage", response.data);
		return response.data.body[0];
	}

	static async addMessage(message) {
		const _response = await axios.post(`${API_URL}/api/messages`, {
			...message
		});
	}

}
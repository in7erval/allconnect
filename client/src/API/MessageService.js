import axios from "axios";
import {API_URL} from "../config";

const MessageService = {
	addMessage: async (message) => {
		await axios.post(`${API_URL}/api/messages`, {
			...message
		});
	},

	getAllRoomsForUser: async (userId) => {
		const response = await axios.get(`${API_URL}/api/messages/rooms`, {
			params: {user: userId}
		});
		console.log("getAllRoomsForUser", response);
		return response.data;
	}
};

export default MessageService;
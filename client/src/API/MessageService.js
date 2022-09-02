import $api from "./index";

const MessageService = {
	addMessage: async (message) => {
		return $api.post(`/messages`, {
			...message
		});
	},

	getAllRoomsForUser: async (userId) => {
		return $api.get(`/messages/rooms`, {
			params: {user: userId}
		});
	},

	countUnread: (userId) => {
		return $api.get(`/messages/unread`, {params: {user: userId}});
	}
};

export default MessageService;
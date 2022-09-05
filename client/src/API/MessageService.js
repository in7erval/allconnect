import {$authApi} from "./index";

const MessageService = {
	addMessage: async (message) => {
		return $authApi.post(`/messages`, {
			...message
		});
	},

	getAllRoomsForUser: async (userId) => {
		return $authApi.get(`/messages/rooms`, {
			params: {user: userId}
		});
	},

	getUnreadInit: (userId) => {
		return $authApi.get(`/messages/unread`, {params: {user: userId}});
	},

	getUnread: (userId) => {
		return $authApi.get(`/messages/unread/subscribe`, {params: {user: userId}});
	}
};

export default MessageService;
import $api from "./index";

const NotificationService = {

	getAllById: (userId, limit = 10, page = 1) => {
		return $api.get(`/notifications`, {
			params: {
				limit: limit,
				page: page,
				userId
			}
		});
	},

	getOne: (userId) => {
		return $api.get(`/notification`, {
			params: {
				id: userId
			}
		});
	}

};

export default NotificationService;
import $api from "./index";

const NotificationService = {

	getNotifications: (userId, limit = 10, page = 1) => {
		return $api.get(`/notifications`, {
			params: {
				limit: limit,
				page: page,
				userId
			}
		});
	}

};

export default NotificationService;
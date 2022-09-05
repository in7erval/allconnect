import {$authApi} from "./index";

const NotificationService = {

	getAllById: (userId, limit = 10, page = 1) => {
		return $authApi.get(`/notifications`, {
			params: {
				limit: limit,
				page: page,
				userId
			}
		});
	},

	getOne: (userId) => {
		return $authApi.get(`/notification`, {
			params: {
				id: userId
			}
		});
	}

};

export default NotificationService;
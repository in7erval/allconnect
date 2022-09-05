import {$authApi} from "./index";

const UserService = {

	getAll: async (limit = 10, page = 1) => {
		return $authApi.get(`/users`, {
			params: {
				limit: limit,
				page: page
			}
		});

	},

	getFullById: async (id) => {
		return $authApi.get(`/users/${id}`, {
			params: {
				friends: true
			}
		});
	},

	getById: async (id) => {
		return $authApi.get(`/users/${id}`);
	},

	getUserPosts: (userId, limit, page) => {
		return $authApi.get(`/users/${userId}/posts`, {
			params: {
				limit: limit,
				page: page,
				owner: true,
				comments: true
			}
		});
	},

	getByName: async (firstName, lastName) => {
		return $authApi.get(`/users/getUserByName`, {
			params: {
				firstName, lastName
			}
		});
	},

	addFriend: async (userId, friendId) => {
		return $authApi.get(`/users/addFriend`, {
			params: {
				userId, friendId
			}
		});
	},

	deleteFriend: async (userId, friendId) => {
		return $authApi.get(`/users/deleteFriend`, {
			params: {
				userId, friendId
			}
		});
	},

	changeName: async (userId, firstName, lastName) => {
		return $authApi.post(`/users/update`, {
			userId, firstName, lastName
		});
	},

	savePhoto: async (userId, data) => {
		const formData = new FormData();
		formData.append('image', data);
		console.log("data", data);

		return $authApi.post(`/users/${userId}/image`, formData,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
		);
	}

};

export default UserService;
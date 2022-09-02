import $api from "./index";

const UserService = {

	getAll: async (limit = 10, page = 1) => {
		return $api.get(`/users`, {
			params: {
				limit: limit,
				page: page
			}
		});

	},

	getFullById: async (id) => {
		return $api.get(`/users/${id}`, {
			params: {
				friends: true
			}
		});
	},

	getById: async (id) => {
		return $api.get(`/users/${id}`);
	},

	getUserPosts: (userId, limit, page) => {
		return $api.get(`/users/${userId}/posts`, {
			params: {
				limit: limit,
				page: page,
				owner: true,
				comments: true
			}
		});
	},

	getByName: async (firstName, lastName) => {
		return $api.get(`/users/getUserByName`, {
			params: {
				firstName, lastName
			}
		});
	},

	addFriend: async (userId, friendId) => {
		return $api.get(`/users/addFriend`, {
			params: {
				userId, friendId
			}
		});
	},

	deleteFriend: async (userId, friendId) => {
		return $api.get(`/users/deleteFriend`, {
			params: {
				userId, friendId
			}
		});
	},

	changeName: async (userId, firstName, lastName) => {
		return $api.post(`/users/update`, {
			userId, firstName, lastName
		});
	},

	savePhoto: async (userId, data) => {
		const formData = new FormData();
		formData.append('image', data);
		console.log("data", data);

		return $api.post(`/users/${userId}/image`, formData,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
		);
	}

};

export default UserService;
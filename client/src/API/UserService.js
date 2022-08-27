import axios from "axios";
import {API_URL} from "../config";

const UserService = {
	getAll: async (limit = 10, page = 1) => {
		const response = await axios.get(`${API_URL}/api/users`, {
			params: {
				limit: limit,
				page: page
			}
		});
		console.log("users", response.data);
		return response.data;
	},

	getFullById: async (id) => {
		console.debug(`getFullById(${id})`);
		const response = await axios.get(`${API_URL}/api/users/${id}`, {
			params: {
				friends: true
			}
		});

		let data = {
			...response.data
		};

		console.log("usersFull: getById", data);
		return data;
	},

	getById: async (id) => {
		const response = await axios.get(`${API_URL}/api/users/${id}`);
		console.log("users: getById", response.data);
		return response.data;
	},

	getUserPosts: async (userId, limit, page) => {
		const response = await axios.get(`${API_URL}/api/users/${userId}/posts`, {
			params: {
				limit: limit,
				page: page,
				owner: true,
				comments: true
			}
		});

		console.log("userService: getUserPosts", response.data);
		return response.data;
	},

	getByName: async (firstName, lastName) => {
		const response = await axios.get(`${API_URL}/api/getUserByName`, {
			params: {
				firstName, lastName
			}
		});

		console.log("userService: getByName", response.data);
		return response.data;
	},

	addFriend: async (userId, friendId) => {
		await axios.get(`${API_URL}/api/addFriend`, {
			params: {
				userId, friendId
			}
		});

		console.log("userService: addFriend");
	},

	deleteFriend: async (userId, friendId) => {
		await axios.get(`${API_URL}/api/deleteFriend`, {
			params: {
				userId, friendId
			}
		});

		console.log("userService: deleteFriend");
	},

	changeName: async (userId, firstName, lastName) => {
		await axios.post(`${API_URL}/api/users/update`, {
			userId, firstName, lastName
		});

		console.log("userService: changeName");
	},

	savePhoto: async (userId, data) => {
		const formData = new FormData();
		formData.append('image', data);
		console.log("data", data);

		await axios.post(`${API_URL}/api/user/${userId}/image`, formData,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
		);

		console.log("userService: setPhoto");
	}

};

export default UserService;
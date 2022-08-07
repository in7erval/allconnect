import axios from "axios";

export default class UserService {

	static async getAll(limit = 10, page = 1) {
		const response = await axios.get('/api/users', {
			params: {
				limit: limit,
				page: page
			}
		});
		console.log("users", response.data);
		return response.data;
	}

	static async getFullById(id) {
		console.debug(`getFullById(${id})`);
		const response = await axios.get('/api/users/' + id, {
			params: {
				friends: true
			}
		});

		let data = {
			...response.data,
			// commentsWrote: commentsWrote.data.count,
			// postsDone: postsDone.data.count
		};

		console.log("usersFull: getById", data);
		return data;
	}

	static async getById(id) {
		const response = await axios.get('/api/users/' + id);
		console.log("users: getById", response.data);
		return response.data;
	}

	static
	async getUserPosts(userId, limit, page) {
		// todo: backend возвращает сразу все посты!!!!

		const response = await axios.get(`/api/users/${userId}/posts`, {
			params: {
				limit: limit,
				page: page,
				owner: true,
				comments: true
			}
		});

		console.log("userService: getUserPosts", response.data);
		return response.data;
	}

	static async getByName(firstName, lastName) {
		const response = await axios.get(`/api/getUserByName`, {
			params: {
				firstName, lastName
			}
		});

		console.log("userService: getByName", response.data);
		return response.data;
	}

	static async addFriend(userId, friendId) {
		const response = await axios.get(`/api/addFriend`, {
			params: {
				userId, friendId
			}
		});

		console.log("userService: addFriend");
	}

	static async deleteFriend(userId, friendId) {
		const response = await axios.get(`/api/deleteFriend`, {
			params: {
				userId, friendId
			}
		});

		console.log("userService: deleteFriend");
	}

	static async changeName(userId, firstName, lastName) {
		const response = await axios.post(`/api/users/update`, {
			userId, firstName, lastName
		});

		console.log("userService: changeName");
	}

	static async savePhoto(userId, data) {
		const formData = new FormData();
		formData.append('image', data);

		const response = await axios.post(`/api/user/${userId}/image`, formData,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
		);

		console.log("userService: setPhoto");
	}

}
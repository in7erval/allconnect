import axios from "axios";

export default class UserAuthService {

	static async checkLoginPassword(login, password) {

		const response = await axios.post('/api/auth', {
			login: login,
			loginPass: btoa(`${login}:${password}`)
		});
		console.log("response", response.data);
		return response.data;
	}

	static async registerUser(user) {
		const response = await axios.post('/api/register', {
			...user
		});
		console.log("response", response.data);
		return response.data;
	}

	// static async getAll(limit = 10, page = 1) {
	// 	const response = await axios.get('/api/users', {
	// 		params: {
	// 			limit: limit,
	// 			page: page
	// 		}
	// 	});
	// 	console.log("users", response.data);
	// 	return response.data;
	// }
	//
	// static
	// async getById(id) {
	// 	const response = await axios.get('/api/usersFull/' + id);
	// 	const commentsWrote = await axios.get('/api/users/' + id + '/comments?count');
	// 	const postsDone = await axios.get('/api/users/' + id + '/posts?count');
	//
	// 	let data = {
	// 		...response.data,
	// 		commentsWrote: commentsWrote.data.count,
	// 		postsDone: postsDone.data.count
	// 	};
	//
	// 		console.log("usersFull: getById", data);
	// 	return data;
	// }

}
import axios from "axios";
import {API_URL} from "../config";

export default class UserAuthService {

	constructor() {}

	static async registerUser(user) {
		const response = await axios.post(`${API_URL}/api/register`, {
			...user
		});
		console.log("response", response.data);
		return response.data;
	}

	static async getUserByUid(uid) {
		const response = await axios.get(`${API_URL}/api/auth`,
			{
				params: {uid: uid}
			});
		console.log("getUserIdByUid() response", response);
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
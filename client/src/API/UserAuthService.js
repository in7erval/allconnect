import axios from "axios";
import {API_URL} from "../config";

const UserAuthService = {

	registerUser: async (user) => {
		const response = await axios.post(`${API_URL}/api/register`, {
			...user
		});
		console.log("response", response.data);
		return response.data;
	},

	getUserByUid: async (uid) => {
		const response = await axios.get(`${API_URL}/api/auth`,
			{
				params: {uid: uid}
			});
		console.log("getUserIdByUid() response", response);
		return response.data;
	}

};

export default UserAuthService;
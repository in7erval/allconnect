import axios from 'axios';

// import {API_URL} from "../config";
import {TOKEN} from "../constants";
import {API_URL} from "../config";

const $api = axios.create({
	withCredentials: true,
	baseURL: `http://localhost:3001/api`,
});

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN)}`;
	return config;
});

$api.interceptors.response.use((config) => {
	return config;
}, async error => {
	const originalRequest = error.config;
	if (error.response.status == 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response = await axios.get(`${API_URL}/api/refresh`,
				{withCredentials: true}
			);
			localStorage.setItem('token', response.data.accessToken);
			return $api.request(originalRequest);
		} catch (error) {
			console.log('НЕ АВТОРИЗОВАН', error);
		}
		throw error;
	}
})

export default $api;
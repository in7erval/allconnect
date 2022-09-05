import axios from 'axios';

import {SERVER_URI, TOKEN} from "../constants";

console.log(SERVER_URI);

export const $api = axios.create({
	baseURL: `${SERVER_URI}/api`,
});

export const $authApi = axios.create({
	baseURL: `${SERVER_URI}/api`,
	withCredentials: true
});

$authApi.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN)}`;
	return config;
});

const authInterceptorOnRejected = async error => {
	const originalRequest = error.config;
	if (error.response.status == 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response = await axios.get(`${SERVER_URI}/api/refresh`,
				{withCredentials: true}
			);
			localStorage.setItem('token', response.data.accessToken);
			return $api.request(originalRequest);
		} catch (error) {
			console.log('НЕ АВТОРИЗОВАН', error);
		}
		throw error;
	}
}

$authApi.interceptors.response.use(config => config, authInterceptorOnRejected);
$api.interceptors.response.use(config => config, authInterceptorOnRejected);
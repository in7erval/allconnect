import {$authApi} from './index';

const UserAuthService = {

	/*
		{accessToken, refreshToken, user: {firstName, lastName, email, id}}
	 */
	login: async (email, password) => {
		return $authApi.post('/login', {email, password});
	},

	registration: async (email, password, firstName, lastName) => {
		return $authApi.post('/registration', {email, password, firstName, lastName});
	},

	logout: async () => {
		return $authApi.post('/logout');
	},

};

export default UserAuthService;
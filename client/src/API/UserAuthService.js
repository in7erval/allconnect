import $api from './index';

const UserAuthService = {

	/*
		{accessToken, refreshToken, user: {firstName, lastName, email, id}}
	 */
	login: async (email, password) => {
		return $api.post('/login', {email, password});
	},

	registration: async (email, password, firstName, lastName) => {
		return $api.post('/registration', {email, password, firstName, lastName});
	},

	logout: async () => {
		return $api.post('/logout');
	},

};

export default UserAuthService;
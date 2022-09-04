import {makeAutoObservable} from "mobx";
import UserAuthService from "../API/UserAuthService";
import axios from 'axios';
import {API_URL} from "../config";
import {TOKEN} from "../constants";

export default class Store {
	user = {};
	isAuth = false;
	isLoading = false;
	errors = [];
	onlineUsers = [];
	unreadMessages = [];
	notifications = [];

	constructor() {
		makeAutoObservable(this);
	}

	get userId() {
		return this.user.id;
	}

	setUnreadMessages(messages) {
		this.unreadMessages = messages;
	}

	get countUnreadMessages() {
		return this.unreadMessages.length;
	}

	setNotifications(notifications) {
		this.notifications = notifications;
	}

	addNotification(notification) {
		if (!this.notifications.some(value => value._id === notification._id)) {
			this.notifications = [notification, ...this.notifications];
		}
	}

	setLoading(bool) {
		this.isLoading = bool;
	}

	setAuth(bool) {
		this.isAuth = bool;
	}

	setUser(user) {
		this.user = user;
	}

	addError(error) {
		this.errors = [...this.errors, error];
	}

	deleteError(index) {
		this.errors = this.errors.filter((v, index_) => index_ !== index);
	}

	setOnlineUsers(onlineUsers) {
		this.onlineUsers = onlineUsers;
	}

	async login(email, password) {
		try {
			const response = await UserAuthService.login(email, password);
			console.log('login', response);
			localStorage.setItem(TOKEN, response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (error) {
			console.error(error.response?.data?.message);
		}
	}

	async registration(email, password, firstName, lastName) {
		try {
			const response = await UserAuthService.registration(email, password, firstName, lastName);
			console.log('registration', response);
			localStorage.setItem(TOKEN, response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (error) {
			console.error(error.response?.data?.message);
		}
	}

	async logout() {
		try {
			const _response = await UserAuthService.logout();
			this.setUser({});
			this.setUnreadMessages([]);
			this.setOnlineUsers([]);
			localStorage.removeItem(TOKEN);
			this.setAuth(false);
		} catch (error) {
			console.error(error.response?.data?.message);
		}
	}

	async checkAuth() {
		this.setLoading(true);
		try {
			const response = await axios.get(`${API_URL}/api/refresh`,
				{withCredentials: true}
			);
			console.log("checkAuth", response);
			localStorage.setItem(TOKEN, response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (error) {
			console.log(error.response?.data?.message);
		} finally {
			this.setLoading(false);
		}
	}
}
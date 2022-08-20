const storage = {
	get: (key) =>
		window.localStorage.getItem(key)
			? JSON.parse(window.localStorage.getItem(key))
			: undefined,
	set: (key, value) => window.localStorage.setItem(key, JSON.stringify(value))
}

export default storage
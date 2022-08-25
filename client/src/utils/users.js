const transformDateTime = (dateTime) => {
	dateTime = new Date(dateTime);
	let currentDate = new Date();
	let localeTime = dateTime.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
	if (currentDate.getDate() === dateTime.getDate()) {
		return "сегодня в " + localeTime;
	} else if (dateTime.getDate() === currentDate.getDate() - 1) {
		return "вчера в " + localeTime;
	} else if (dateTime.getDate() === currentDate.getDate() - 2) {
		return "позавчера в " + localeTime;
	} else {
		let optionsDate = {
			year: "numeric",
			month: "long",
			day: "numeric"
		};
		let localeDate = dateTime.toLocaleDateString('ru-RU', optionsDate);
		console.log("LocaleTime", localeTime);
		return `${localeDate} в ${localeTime}`;
	}
}

export const isUserOnline = (users, idToCheck) => {
	for (let user of users) {
		if (user.userId === idToCheck && user.connected) {
			return true;
		}
	}
	return false;
}

export const getOfflineInfo = (users, idToCheck) => {
	for (let user of users) {
		if (user.userId === idToCheck) {
			return {lastConnection: transformDateTime(user.lastConnection)}
		}
	}
	return {lastConnection: "неизвестно"}
}

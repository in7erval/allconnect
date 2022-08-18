import {SERVER_URI, USER_ID} from '../constants';
import {useEffect, useRef, useState} from 'react'
import {io} from 'socket.io-client'

export default function useComments(postId) {
	// извлекаем данные пользователя из локального хранилища
	// const post = {
	//
	// 	userId: localStorage.getItem(USER_ID),
	// 	userName: loggedUser.firstName,
	// 	roomId: roomId
	// };
	// storage.set(USER_KEY, user);
	// локальное состояние для списка пользователей
	// const [users, setUsers] = useState([])
	// локальное состояние для списка сообщений

	const loggedUserId = localStorage.getItem(USER_ID);
	console.log()

	const [comments, setComments] = useState([])
	// состояние для системного сообщения
	const [log, setLog] = useState(null)
	// иммутабельное состояние для сокета
	const {current: socket} = useRef(
		io(SERVER_URI, {
			query: {
				postId: postId,
				userId: loggedUserId
				// // отправляем идентификатор комнаты и имя пользователя на сервер
				// roomId: user.roomId,
				// userName: user.userName
			}
		})
	);


	// регистрируем обработчики
	useEffect(() => {
		// сообщаем о подключении нового пользователя
		// socket.emit('user:add', user);

		// запрашиваем сообщения из БД
		socket.emit('comments:get');


		// обрабатываем получение системного сообщения
		socket.on('log', (log) => {
			setLog(log);
		})

		// // обрабатываем получение обновленного списка пользователей
		// socket.on('user_list:update', (users) => {
		// 	setUsers(users);
		// })

		// обрабатываем получение обновленного списка сообщений
		socket.on('comment_list:update', (comments) => {
			console.log("commentsUpdate", comments);
			setComments(comments);
		})
	}, [])

	const sendComment = (comment) => {
		socket.emit('comments:add', comment)
	}

	// метод для удаления сообщения
	const removeComment = (comment) => {
		socket.emit('comments:remove', comment)
	}

	return {comments, log, sendComment, removeComment};

}
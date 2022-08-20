const socketio = require('socket.io');

function initSocket(server) {

	const io = new socketio.Server(server, {
		cors: {
			origin: '*' //fixme on host 'http://localhost:3000"
		}
	});

// получаем обработчики событий
	const registerMessageHandlers = require('./handlers/messageHandlers');
	// const registerUserHandlers = require('./handlers/userHandlers');
	const registerCommentHandlers = require('./handlers/commentHandlers');

// данная функция выполняется при подключении каждого сокета (обычно, один клиент = один сокет)
	const onConnection = (io, socket) => {
		console.log('User connected');

		const {roomId, postId, userId, action} = socket.handshake.query;

		socket.roomId = roomId;
		socket.postId = postId;
		socket.userId = userId;
		socket.action = action;
		// registerUserHandlers(io, socket);

		switch (action) {
			case "message":
				socket.join(roomId);
				registerMessageHandlers(io, socket);
				break;
			case "comment":
				socket.join(postId);
				registerCommentHandlers(io, socket);
				break
		}

		// обрабатываем отключение сокета-пользователя
		socket.on('disconnect', () => {
			// выводим сообщение
			console.log('User disconnected')
			// покидаем комнату
			switch (action) {
				case "message":
					socket.leave(roomId);
					break;
				case "comment":
					socket.leave(postId);
					break;
			}
		})
	}

// обрабатываем подключение
	io.on('connection', (socket) => {
		onConnection(io, socket)
	});
}

module.exports = {initSocket}
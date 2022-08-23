const Message = require('../../models/message');
const onError = require('../../utils/onError');
const mongoMessages = require("../../dbapi/mongoMessages");

// "хранилище" для сообщений
const messages = {}

function registerMessageHandlers(io, socket) {
	// извлекаем идентификатор комнаты
	const {roomId} = socket;

	// утилита для обновления списка сообщений
	const updateMessageList = () => {
		io.to(roomId).emit('message_list:update', messages[roomId])
	};

	// обрабатываем получение сообщений
	socket.on('message:get', async () => {
		try {
			// получаем сообщения по `id` комнаты
			const _messages = await Message.find({roomId})
				.populate('user').exec();
			console.log("_messages", _messages);
			// инициализируем хранилище сообщений
			messages[roomId] = _messages

			// обновляем список сообщений
			updateMessageList();
		} catch (e) {
			onError(e);
		}
	});


	// обрабатываем создание нового сообщения
	socket.on('message:add', async (message) => {

		console.log("INPUT MESSAGE", message);
		// пользователи не должны ждать записи сообщения в БД

		message = await mongoMessages.save(message);

		// это нужно для клиента
		message.createdAt = Date.now();

		await message.populate('user');
		console.log("POPULATE", message);

		// создаем сообщение оптимистически,
		// т.е. предполагая, что запись сообщения в БД будет успешной
		messages[roomId].push(message);

		// обновляем список сообщений
		updateMessageList()
	});

	// обрабатываем удаление сообщения
	socket.on('message:remove', (messageId) => {
		// пользователи не должны ждать удаления сообщения из БД
		Message.findByIdAndDelete(messageId).exec()
			.then(() => {
				console.log("message removed");
				// if (messageType !== 'text') {
				// 	removeFile(textOrPathToFile)
				// }
			})
			.then(() => {
					console.log(messages[roomId].length);
					console.log(messages[roomId].map(el => el._id));
					console.log(messageId);
					messages[roomId] = messages[roomId].filter((m) => m._id.toString() !== messageId);
					console.log(messages[roomId].length);
				}
			)
			.then(() => updateMessageList())
			.catch(onError);
	})

	socket.on('message:addToSeenBy', async (parameters) => {
		const {_id: messageId, user: userId} = parameters;
		await Message.findByIdAndUpdate(messageId, {"$push": {"seenBy": userId}}, (err, docs) => {
			if (err) {
				console.log(err)
			} else {
				console.log("Updated message : ", docs);
			}
		})
			.catch(onError)
			.then(() => updateMessageList());
	});

}

module.exports = registerMessageHandlers;

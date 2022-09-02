import {SERVER_URI, USER_KEY} from '../constants';
import {useContext, useEffect, useRef, useState} from 'react'
import {io} from 'socket.io-client'
import storage from "../utils/storage";
import {Context} from "../index";

export default function useChat(roomId) {
	const {store} = useContext(Context);
	const user = {
		userId: store.userId,
		roomId: roomId
	};
	storage.set(USER_KEY, user);

	const [messages, setMessages] = useState([])

	const { current: socket } = useRef(
		io(SERVER_URI, {
			query: {
				roomId: user.roomId,
				userId: user.userId,
				action: "message"
			}
		})
	);

	useEffect(() => {
		socket.emit('message:get')

		socket.on('message_list:update', (messages) => {
			setMessages(messages);
		})
	}, [])

	const sendMessage = (message) => {
		socket.emit('message:add', message)
	}

	const removeMessage = (message) => {
		socket.emit('message:remove', message)
	}

	const addToSeenBy = (messageId, userId) => {
		socket.emit('message:addToSeenBy', {_id: messageId, user: userId});
	}

	return {messages, sendMessage, removeMessage, addToSeenBy};
}
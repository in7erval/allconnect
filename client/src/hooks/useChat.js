import {SERVER_URI, USER_ID, USER_KEY} from '../constants';
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import storage from "../utils/storage";

export default function useChat(roomId) {
	const user = {
		userId: localStorage.getItem(USER_ID),
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
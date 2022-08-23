import {SERVER_URI, USER_ID} from '../constants';
import {useEffect, useRef, useState} from 'react'
import {io} from 'socket.io-client'

export default function useComments(postId) {
	const loggedUserId = localStorage.getItem(USER_ID);
	console.log()

	const [comments, setComments] = useState([])
	const {current: socket} = useRef(
		io(SERVER_URI, {
			reconnectionDelayMax: 10_000,
			forceNew: true,
			query: {
				postId: postId,
				userId: loggedUserId,
				action: "comment"
			}
		})
	);

	useEffect(() => {
		socket.emit('comments:get');

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

	return {comments, sendComment, removeComment};
}
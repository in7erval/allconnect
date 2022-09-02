import {SERVER_URI} from '../constants';
import {useContext, useEffect, useRef, useState} from 'react'
import {io} from 'socket.io-client'
import {Context} from "../index";

export default function useComments(postId) {
	const {store} = useContext(Context);
	const loggedUserId = store.userId;

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
import {useEffect, useState} from 'react';
import Loader from "../../components/UI/Loader/Loader";
import {USER_ID} from "../../constants";
import {useFetching} from "../../hooks/useFetching";
import MessageRoomCard from "../../components/Message/MessageRoomCard/MessageRoomCard";

import cl from "./Messages.module.css";
import MessageService from "../../API/MessageService";
import {Link} from "react-router-dom";

// const createRoomId = (firstId, secondId) => firstId > secondId ? `${firstId}:${secondId}` : `${secondId}:${firstId}`;
//
// const checkFriendNotInLastMessages = (friend, lastMessages) => {
// 	for (let message of lastMessages) {
// 		if (message.roomId.includes(friend._id)) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

const Messages = () => {
	// const [user, setUser] = useState({});
	// const [lastMessages, setLastMessages] = useState([]);
	const [lastMessages, setLastMessages] = useState([]);

	const loggedUserId = localStorage.getItem(USER_ID);

	// const [fetchUserForPage, isLoading, _error] = useFetching(async () => {
	// 	await UserService.getFullById(loggedUserId)
	// 		.then(response => response.body)
	// 		.then(body => {
	// 			setUser(body);
	// 			return body
	// 		})
	// 		.then(body => body.friends)
	// 		.then(friends_ => Promise.all(
	// 			friends_.map(friend => MessageService.getLastMessage(createRoomId(friend._id, loggedUserId)))
	// 		))
	// 		.then(lastMessages => {
	// 			console.log("lastMessages", lastMessages);
	// 			setLastMessages(lastMessages.filter(element => element !== undefined));
	// 		});
	//
	// });

	const [fetchMessagesForPage, isLoadingMessages, _errorMessages] = useFetching(async () => {
		await MessageService.getAllRoomsForUser(loggedUserId)
			.then(response => response.body)
			.then(body => {
				console.log(body);
				setLastMessages(body)
			});
	})

	console.log(lastMessages);


	useEffect(() => {
		console.log("fetch messages for page");
		// fetchUserForPage();
		fetchMessagesForPage();
	}, []);

	// const findLastMessageByUserId = (userId) => {
	// 	return lastMessages.find(element => element.roomId === createRoomId(userId, loggedUserId));
	// }

	// const friendsWithLastMessages = useMemo(() =>
	// 	user?.friends?.filter(element => !checkFriendNotInLastMessages(element, lastMessages))
	// 		.map(element => {
	// 				let lastMessage = findLastMessageByUserId(element._id);
	// 				return {...element, messagePreview: lastMessage.text, messageTime: lastMessage.createdAt};
	// 			}
	// 		).sort((element1, element2) => {
	// 		let date1 = new Date(element1.messageTime);
	// 		let date2 = new Date(element2.messageTime);
	// 		console.log(date1, date2, date2 - date1);
	//
	// 		return date2 - date1;
	// 	}), [user, lastMessages]);

	return (
			<div style={{flex: 1, width: "100%", maxWidth: 600}}>
				<div>
					<h2 className={cl.messages_header}>
						Сообщения
					</h2>

					<div className={cl.messages_rooms}>
						{isLoadingMessages ? <Loader/> :
							lastMessages.map(element => (
								<Link key={element._id} to={`/messages/${element._id}`}>
									<MessageRoomCard
										user={element.user}
										id={element._id}
										messagePreview={element.text}
										messageTime={element.createdAt}
									/>
								</Link>
							))
						}
						{/*{friendsWithLastMessages?.map(element => (*/}
						{/*	<Link key={element._id} to={`/messages/${createRoomId(loggedUserId, element._id)}`}>*/}
						{/*		<MessageRoomCard*/}
						{/*			user={element}*/}
						{/*			id={element._id}*/}
						{/*			messagePreview={element.messagePreview}*/}
						{/*			messageTime={element.messageTime}*/}
						{/*		/>*/}
						{/*	</Link>*/}
						{/*))}*/}
						{/*{user?.friends?.filter(element => checkFriendNotInLastMessages(element, lastMessages)).map(element => (*/}
						{/*	<Link key={element._id} to={`/messages/${createRoomId(loggedUserId, element._id)}`}>*/}
						{/*		<MessageRoomCard*/}
						{/*			user={element}*/}
						{/*			id={element._id}*/}
						{/*		/>*/}
						{/*	</Link>*/}
						{/*))}*/}
					</div>
				</div>
			</div>
	);
};

export default Messages;
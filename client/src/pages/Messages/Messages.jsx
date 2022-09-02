import {useContext, useEffect, useState} from 'react';
import Loader from "../../components/UI/Loader/Loader";
import {useFetching} from "../../hooks/useFetching";
import MessageRoomCard from "../../components/Message/MessageRoomCard/MessageRoomCard";

import cl from "./Messages.module.css";
import MessageService from "../../API/MessageService";
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

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

	const {store} = useContext(Context);
	// store.setActivePage(MESSAGES_PAGE);
	const loggedUserId = store.userId;
	const unreadMessages = store.unreadMessages;

	const [fetchMessagesForPage, isLoadingMessages, _errorMessages] = useFetching(async () => {
		await MessageService.getAllRoomsForUser(loggedUserId)
			.then(response => response.data)
			.then(data => {
				console.log(data);
				setLastMessages(data);
			})
			.catch(error => store.addError(error));
	})

	console.log(lastMessages);


	useEffect(() => {
		console.log("fetch messages for page");
		fetchMessagesForPage();
	}, []);


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
									isUnread={unreadMessages.some(unreadMessage => unreadMessage.user === element.user._id)}
								/>
							</Link>
						))
					}
				</div>
			</div>
		</div>
	);
};

export default observer(Messages);
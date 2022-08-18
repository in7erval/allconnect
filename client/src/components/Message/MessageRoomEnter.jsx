import React, {useEffect, useRef} from 'react';
import useChat from "../../hooks/useChat";
import MessageRoom from "./MessageRoom";

const MessageRoomEnter = ({roomId, user}) => {

	const {messages, log, sendMessage, removeMessage} = useChat(roomId, user);
	const refMessages = useRef();


	useEffect(() => {
		// скролл до низа при рендере
		if (refMessages.current) {
			refMessages.current.scrollTop = refMessages.current.scrollHeight;
		}
		// console.log(refMessages);
	}, []);


	return (
		<MessageRoom
			messages={messages}
			log={log}
			sendMessage={sendMessage}
			removeMessage={removeMessage}
			toUser={user}
			refMessages={refMessages}/>
	);
};

export default MessageRoomEnter;
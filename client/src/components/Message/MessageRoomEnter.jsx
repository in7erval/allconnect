import {useEffect, useRef} from 'react';
import useChat from "../../hooks/useChat";
import MessageRoom from "./MessageRoom";
import PropTypes from "prop-types";

const MessageRoomEnter = ({roomId, user}) => {

	const {messages, log, sendMessage, removeMessage} = useChat(roomId, user);
	const referenceMessages = useRef();


	useEffect(() => {
		// скролл до низа при рендере
		if (referenceMessages.current) {
			referenceMessages.current.scrollTop = referenceMessages.current.scrollHeight;
		}
		// console.log(referenceMessages);
	}, []);


	return (
		<MessageRoom
			messages={messages}
			log={log}
			sendMessage={sendMessage}
			removeMessage={removeMessage}
			toUser={user}
			refMessages={referenceMessages}
		/>
	);
};

MessageRoomEnter.propTypes = {
	roomId: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired
}

export default MessageRoomEnter;
import cl from "./MessageRoomCard.module.css";
import userpic from "../../../assets/userpic.jpeg";
import PropTypes from "prop-types";

const MessageRoomCard = ({user, id, messagePreview, messageTime}) => {

	if (messagePreview && messagePreview.length > 50) {
			messagePreview = messagePreview.slice(0, 50) + "...";

	}

	if (messageTime) {
		messageTime = (new Date(messageTime)).toLocaleTimeString([], {timeStyle: 'short'});
	}

	const classname = cl.message_card + " " + (messagePreview ? "" : cl.no_messages);

	return (
		<div className={classname} key={id}>
			<img src={user.picture ?? userpic} alt={`pic for ${user.firstName}`}/>
			<div className={cl.message_card_name}>
				<p>{user.lastName} {user.firstName}</p>
				<p className={cl.message_preview}>{messagePreview}</p>
			</div>
			<div className={cl.message_time}>
				<p>{messageTime}</p>
			</div>
		</div>
	);
};

MessageRoomCard.propTypes = {
	user: PropTypes.object.isRequired,
	id: PropTypes.any.isRequired,
	messagePreview: PropTypes.string,
	messageTime: PropTypes.string
}

export default MessageRoomCard;
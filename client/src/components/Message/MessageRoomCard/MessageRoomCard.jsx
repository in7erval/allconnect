import cl from "./MessageRoomCard.module.css";
import userpic from "../../../assets/userpic.jpeg";
import PropTypes from "prop-types";
import Status from "../../UI/Status/Status";

const MessageRoomCard = ({user, id, messagePreview, messageTime}) => {

	if (messagePreview && messagePreview.length > 50) {
		messagePreview = messagePreview.slice(0, 50) + "...";
	}

	if (messageTime) {
		messageTime = (new Date(messageTime)).toLocaleTimeString([], {timeStyle: 'short'});
	}

	const classname = cl.message_card + " " + (messagePreview ? "" : cl.no_messages);

	console.log("user", user);

	return (
		<div className={classname} key={id}>
			<img src={user.picture ?? userpic} alt={`pic for ${user.firstName}`}/>
			<div className={cl.message_card_name}>
				<div style={{display: "flex", alignItems: "center"}}>
					<p>{user.lastName} {user.firstName}</p>
					<div style={{marginLeft: 10}}>
						<Status userId={user._id}/>
					</div>
				</div>
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
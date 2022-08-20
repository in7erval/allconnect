import cl from "./MessageRoomCard.module.css";
import userpic from "../../../assets/userpic.jpeg";
import PropTypes from "prop-types";

const MessageRoomCard = ({user, id, onClick}) => {
	return (
		<button className={cl.message_card} key={id} onClick={onClick}>
			<img src={user.picture ?? userpic} alt={`pic for ${user.firstName}`}/>
			<p>{user.lastName} {user.firstName}</p>
		</button>
	);
};

MessageRoomCard.propTypes = {
	user: PropTypes.object.isRequired,
	id: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired
}

export default MessageRoomCard;
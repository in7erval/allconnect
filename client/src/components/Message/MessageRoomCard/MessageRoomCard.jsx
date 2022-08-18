import React from 'react';
import cl from "./MessageRoomCard.module.css";
import userpic from "../../../assets/userpic.jpeg";

const MessageRoomCard = ({user, id, onClick}) => {
	return (
		<button className={cl.message_card} key={id} onClick={onClick}>
			<img src={user.picture ? user.picture : userpic} alt={`pic for ${user.firstName}`}/>
			<p>{user.lastName} {user.firstName}</p>
		</button>
	);
};

export default MessageRoomCard;
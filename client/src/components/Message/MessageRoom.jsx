import {useRef, useState} from 'react';
import MessageInput from "./MessageInput";
import Message from "./Message.jsx";
import cl from "./Message.module.css";
import userpic from "../../assets/userpic.jpeg";
import MessageContextMenu from "./MessageContextMenu/MessageContextMenu";
import PropTypes from "prop-types";

const getPosition = (event_) => {
	let posx = 0;
	let posy = 0;

	if (!event_) event_ = window.event;

	if (event_.pageX || event_.pageY) {
		posx = event_.pageX;
		posy = event_.pageY;
	} else if (event_.clientX || event_.clientY) {
		posx = event_.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = event_.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}

	return {
		x: posx,
		y: posy
	}
};

const MessageRoom = ({messages, sendMessage, removeMessage, toUser, log, refMessages}) => {

	// const loggedUserId = localStorage.getItem(USER_ID);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const contextMenuReference = useRef();
	const [contextMenuFor, setContextMenuFor] = useState(null);

	console.log("SERVER_LOG:", log);
	console.log("messages", messages);


	const onContextMenu = (event_, messageId) => {
		event_.preventDefault();
		console.log(contextMenuReference.current);
		console.log(contextMenuReference.current.offsetWidth);
		console.log(contextMenuReference.current.offsetHeight);

		const positionMenu = (eventInPositionMenu) => {
			let clickCoords = getPosition(eventInPositionMenu);
			let clickCoordsX = clickCoords.x;
			let clickCoordsY = clickCoords.y;

			let menuWidth = contextMenuReference.current.offsetWidth + 4;
			let menuHeight = contextMenuReference.current.offsetHeight + 4;

			let windowWidth = window.innerWidth;
			let windowHeight = window.innerHeight;

			contextMenuReference.current.style.left =
				(((windowWidth - clickCoordsX) < menuWidth) ?
					windowWidth - menuWidth : clickCoordsX) + "px";

			contextMenuReference.current.style.top =
				(((windowHeight - clickCoordsY) < menuHeight) ?
					windowHeight - menuHeight : clickCoordsY) + "px";

		}

		console.log(getPosition(event_));
		positionMenu(event_);
		setShowContextMenu(true);
		setContextMenuFor(messageId);
	};


	return (
		<div onClick={() => setShowContextMenu(false)}>
			<a href={`/user${toUser._id}`}>
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: "#dddddd",
					borderTopLeftRadius: 5,
					borderTopRightRadius: 5,
					padding: "10px 15px"
				}}>
					{toUser.lastName} {toUser.firstName}
					<img
						style={{
							width: 50,
							height: 50,
							borderRadius: '50%',
							objectFit: 'cover'
						}}
						src={toUser.picture ?? userpic} alt={`pic for ${toUser.firstName}`}/>
				</div>
			</a>
			{messages && messages.length > 0 &&
				<div className={cl.messages} ref={refMessages}>
					{messages.map(element => (
							<Message
								key={element._id}
								id={element._id}
								ownerId={element.user._id}
								pic={element.user.picture ?? userpic}
								firstName={element.user.firstName}
								message={element.text}
								onContextMenu={onContextMenu}
								highlight={showContextMenu && contextMenuFor === element._id}
							/>
						)
					)}
				</div>
			}
			<div>
				<MessageInput sendMessage={sendMessage}/>
			</div>
			<MessageContextMenu
				isActive={showContextMenu}
				reference={contextMenuReference}
				liMap={[
					// {onClick: () => console.log("delete me"), text: "Удалить у меня", isDanger: true},
					{onClick: () => removeMessage(contextMenuFor), text: "Удалить у всех", isDanger: true}
					// {onClick: () => () => setShowContextMenu(false), text: "Закрыть", isDanger: false}
				]}
			/>
		</div>
	);
};

MessageRoom.propTypes = {
	messages: PropTypes.array.isRequired,
	log: PropTypes.string.isRequired,
	sendMessage: PropTypes.func.isRequired,
	removeMessage: PropTypes.func.isRequired,
	toUser: PropTypes.object.isRequired,
	refMessages: PropTypes.element.isRequired
}

export default MessageRoom;
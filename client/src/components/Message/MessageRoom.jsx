import React, {useEffect, useRef, useState} from 'react';
import MessageInput from "./MessageInput";
import useChat from "../../hooks/useChat";
import {USER_ID} from "../../constants";
import Message from "./Message.jsx";
import cl from "./Message.module.css";
import userpic from "../../assets/userpic.jpeg";
import MessageContextMenu from "./MessageContextMenu/MessageContextMenu";

const MessageRoom = ({messages, sendMessage, removeMessage, toUser, log, refMessages}) => {

	const loggedUserId = localStorage.getItem(USER_ID);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const contextMenuRef = useRef();
	const [contextMenuFor, setContextMenuFor] = useState(null);

	console.log("SERVER_LOG:", log);
	console.log("messages", messages);



	const onContextMenu = (e, messageId) => {
		e.preventDefault();

		const getPosition = (e) => {
			let posx = 0;
			let posy = 0;

			if (!e) e = window.event;

			if (e.pageX || e.pageY) {
				posx = e.pageX;
				posy = e.pageY;
			} else if (e.clientX || e.clientY) {
				posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}

			return {
				x: posx,
				y: posy
			}
		};
		console.log(contextMenuRef.current);
		console.log(contextMenuRef.current.offsetWidth);
		console.log(contextMenuRef.current.offsetHeight);

		const positionMenu = (e) => {
			let clickCoords = getPosition(e);
			let clickCoordsX = clickCoords.x;
			let clickCoordsY = clickCoords.y;

			let menuWidth = contextMenuRef.current.offsetWidth + 4;
			let menuHeight = contextMenuRef.current.offsetHeight + 4;

			let windowWidth = window.innerWidth;
			let windowHeight = window.innerHeight;

			if ((windowWidth - clickCoordsX) < menuWidth) {
				contextMenuRef.current.style.left = windowWidth - menuWidth + "px";
			} else {
				contextMenuRef.current.style.left = clickCoordsX + "px";
			}

			if ((windowHeight - clickCoordsY) < menuHeight) {
				contextMenuRef.current.style.top = windowHeight - menuHeight + "px";
			} else {
				contextMenuRef.current.style.top = clickCoordsY + "px";
			}
		}

		console.log(getPosition(e));
		positionMenu(e);
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
						src={toUser.picture ? toUser.picture : userpic} alt={`pic for ${toUser.firstName}`}/>
				</div>
			</a>
			{messages && messages.length !== 0 &&
				<div className={cl.messages} ref={refMessages}>
					{messages.map(el => (
							<Message
								key={el._id}
								id={el._id}
								ownerId={el.user._id}
								pic={el.user.picture ? el.user.picture : userpic}
								firstName={el.user.firstName}
								message={el.text}
								onContextMenu={onContextMenu}
								highlight={showContextMenu && contextMenuFor === el._id}
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
				reference={contextMenuRef}
				liMap={[
					// {onClick: () => console.log("delete me"), text: "Удалить у меня", isDanger: true},
					{onClick: () => removeMessage(contextMenuFor), text: "Удалить у всех", isDanger: true}
					// {onClick: () => () => setShowContextMenu(false), text: "Закрыть", isDanger: false}
				]}
			/>
		</div>
	);
};

export default MessageRoom;
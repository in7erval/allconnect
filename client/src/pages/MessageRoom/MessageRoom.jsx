import {useEffect, useMemo, useRef, useState} from 'react';
import MessageInput from "../../components/Message/MessageInput";
import Message from "../../components/Message/Message.jsx";
import cl from "./MessageRoom.module.css";
import userpic from "../../assets/userpic.jpeg";
import MessageContextMenu from "../../components/Message/MessageContextMenu/MessageContextMenu";
import useChat from "../../hooks/useChat";
import {Link, useParams} from "react-router-dom";
import {USER_ID} from "../../constants";
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import Loader from "../../components/UI/Loader/Loader";
import AsideNav from "../../components/AsideNav/AsideNav";

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

const datetimeToDate = datetime => new Date(datetime).toLocaleDateString();


const groupMessages = (messages) => {
	let messagesMap = new Map();

	for (let element of messages) {
		let date = datetimeToDate(element.createdAt);
		let newElement = {...element, continuous: false};
		if (messagesMap.has(date)) {
			messagesMap.get(date).push(newElement);
		} else {
			messagesMap.set(date, [newElement]);
		}
	}

	for (let elements of messagesMap.values()) {
		elements.sort((firstElement, secondElement) => {
			let firstDate = new Date(firstElement.createdAt);
			let secondDate = new Date(secondElement.createdAt);
			return firstDate - secondDate;
		});
	}

	for (let messagesValue of messagesMap.values()) {
		if (messagesValue.length > 1) {
			for (let index = 0; index < messagesValue.length - 1; index++) {
				if (messagesValue[index].user._id === messagesValue[index + 1].user._id) {
					messagesValue[index].continuous = true;
				}
			}
		}
	}

	return messagesMap;
}


const parseMessageRoomId = (messageRoomId) => {
	return messageRoomId.split(":");
}

const MessageRoom = () => {

	const parameters = useParams();
	const loggedUserId = localStorage.getItem(USER_ID);
	const [id1, id2] = parseMessageRoomId(parameters.id);
	let toUserId = (loggedUserId === id1) ? id2 : id1;


	const referenceMessages = useRef();
	const [user, setUser] = useState({});
	const {messages, sendMessage, removeMessage, addToSeenBy} = useChat(parameters.id);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const contextMenuReference = useRef();
	const [contextMenuFor, setContextMenuFor] = useState(null);

	const messagesMap = useMemo(() => groupMessages(messages), [messages]);

	console.log("messages", messagesMap);

	useEffect(() => {
		// скролл до низа при рендере
		if (referenceMessages.current) {
			referenceMessages.current.scrollTop = referenceMessages.current.scrollHeight;
		}
	}, [messagesMap]);

	const [fetchUserTo, isLoadingUserTo, _error] = useFetching(async () => {
		await UserService.getFullById(toUserId)
			.then(response => response.body)
			.then(body => {
				console.log("body", body);
				setUser(body);
			});
	});

	useEffect(() => {
		console.log(`fetch to_user(${toUserId}), localId:${loggedUserId}`);
		fetchUserTo();
	}, []);


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
		<div className="default_page">
			<AsideNav/>
			<div className="default_page__content">
				<div className={cl.main}>
					{isLoadingUserTo ?
						<div style={{
							display: "flex",
							justifyContent: 'center',
							marginTop: 50
						}}>
							<Loader/>
						</div>
						:
						<div style={{flex: 1}} onClick={() => setShowContextMenu(false)}>
							<Link to={`/user${user._id}`}>
								<div className={cl.to_user_card}>
									{user.lastName} {user.firstName}
									<img src={user.picture ?? userpic} alt={`pic for ${user.firstName}`}/>
								</div>
							</Link>
							<div className={cl.messages} ref={referenceMessages}>
								{messages && messages.length > 0 && [...messagesMap.keys()].map(key =>
									(<div key={key}>
											<div className={cl.message_date}>
												{key}
											</div>
											{messagesMap.get(key).map(element => (
												<Message
													id={element._id}
													key={element._id}
													ownerId={element.user._id}
													pic={element.user.picture ?? userpic}
													firstName={element.user.firstName}
													message={element.text}
													createdAt={element.createdAt}
													onContextMenu={onContextMenu}
													continuous={element.continuous}
													seenBy={element.seenBy}
													highlight={showContextMenu && contextMenuFor === element._id}
													addToSeenBy={addToSeenBy}
													toUserId={toUserId}
												/>
											))}
										</div>
									)
								)
								}
							</div>
							<div>
								<MessageInput sendMessage={sendMessage} message={{user: loggedUserId, roomId: parameters.id}}/>
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
					}
				</div>
				{/*<div ref={lastElement} style={{height: 20}}/>*/}
			</div>
		</div>
	);
};
export default MessageRoom;
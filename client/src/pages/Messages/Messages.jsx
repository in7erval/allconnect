import React, {useEffect, useState} from 'react';
import AsideNav from "../../components/AsideNav/AsideNav";
import Loader from "../../components/UI/Loader/Loader";
import {USER_ID} from "../../constants";
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import MessageRoomCard from "../../components/Message/MessageRoomCard/MessageRoomCard";

import cl from "./Messages.module.css";
import MessageRoomEnter from "../../components/Message/MessageRoomEnter";

const Messages = () => {

	const [roomId, setRoomId] = useState(null);
	const [toUser, setToUser] = useState(null);
	const [user, setUser] = useState(null);


	const loggedUserId = localStorage.getItem(USER_ID);

	const [fetchUserForPage, isLoading, error] = useFetching(async () => {
		await UserService.getFullById(loggedUserId)
			.then(resp => resp.body)
			.then(body => setUser(body));
	});


	useEffect(() => {
		console.log("fetch user for page");
		fetchUserForPage();
	}, []);

	const initRoom = (friend) => {
		const roomId = loggedUserId > friend._id ? `${loggedUserId}:${friend._id}` :
			`${friend._id}:${loggedUserId}`;
		setRoomId(roomId);
		setToUser(friend);
	};

	return (
		<div className="default_page">
			<AsideNav/>
			<div className="default_page__content">
				<div
					style={{
						width: '90%',
						maxWidth: 700
					}}>
					{isLoading ?
						<div style={{
							display: "flex",
							justifyContent: 'center',
							marginTop: 50
						}}>
							<Loader/>
						</div> :
						<div style={{flex: 1}}>
							{roomId ?
								<MessageRoomEnter
									user={toUser}
									roomId={roomId}
								/>
								:
								<div>
									<h2 className={cl.messages_header}>
										Сообщения
									</h2>

									<div className={cl.messages_rooms}>
										<div>
											{user?.friends?.map(el => (
												<MessageRoomCard user={el} id={el._id} key={el._id}
																				 onClick={() => initRoom(el)}
												/>
											))
											}
										</div>
									</div>
								</div>
							}
						</div>
					}

				</div>
				{/*<div ref={lastElement} style={{height: 20}}/>*/}
			</div>
		</div>

	);
};

export default Messages;
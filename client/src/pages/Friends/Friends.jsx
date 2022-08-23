import AsideNav from "../../components/AsideNav/AsideNav";
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import {useEffect, useMemo, useState} from "react";

import userpic from "../../assets/userpic.jpeg";

import cl from "./Friends.module.css";
import Loader from "../../components/UI/Loader/Loader";
import MyModal from "../../components/UI/MyModal/MyModal";
import MessageInput from "../../components/Message/MessageInput";
import MessageService from "../../API/MessageService";
import {Link, useParams} from "react-router-dom";

const createRoomId = (firstId, secondId) => firstId > secondId ? `${firstId}:${secondId}` : `${secondId}:${firstId}`;

const Friends = () => {

	const loggedUserId = localStorage.getItem("userId");
	const parameters = useParams();
	const pageUserId = parameters.id ?? loggedUserId;

	console.log("pageUserId:", pageUserId);
	// const isOwner = pageUserId === loggedUserId;

	const [visibleModal, setVisibleModal] = useState(false);
	const [friends, setFriends] = useState([]);
	const [inputName, setInputName] = useState("");
	const [friendTo, setFriendTo] = useState({});
	const [isGlobal, setIsGlobal] = useState(false);

	const [fetchFriends, isLoading, _error] = useFetching(async () => {
		if (!isGlobal) {
			let resp = await UserService.getFullById(pageUserId);
			setFriends(resp.body?.friends);
		} else {
			// todo: pagination
			let resp = await UserService.getAll(1000, 1);
			// console.log(resp.body);
			setFriends(resp.body);
		}
	});

	useEffect(() => {
		console.log("fetch friends");
		fetchFriends();
	}, [isGlobal]);

	const filteredFriends = useMemo(() => {
		if (inputName.trim() === "") {
			return friends;
		}
		let inputs = inputName.trim().split(" ");
		let first = null, second = null;
		console.log(inputs, inputs.length);
		if (inputs.length > 2) {
			return [];
		}
		if (inputs.length > 1) {
			first = inputs[0].toLowerCase();
			second = inputs[1].toLowerCase();
		} else if (inputs.length === 1) {
			first = inputs[0].toLowerCase();
		}
		return friends.filter(friend => {
			let firstName = friend.firstName.toLowerCase();
			let lastName = friend.lastName.toLowerCase();
			if (first !== null && second !== null) {
				if (firstName.includes(first) && lastName.includes(second)) {
					return true;
				}
				if (firstName === second && lastName === first) {
					return true;
				}
			}
			if (first !== null && second === null && (firstName.includes(first) || lastName.includes(first))) {
				return true;
			}
			if (first === null && second !== null && (firstName.includes(second) || lastName.includes(second))) {
				return true;
			}
			return false;
		})
	}, [friends, inputName]);

	return (
		<div className="default_page">
			<AsideNav/>
			<div className="default_page__content">
				<div className={cl.friends}>
					{isLoading ? <Loader/> :
						<div className={cl.main}>
							<div className={cl.main__header}>
								<div>
									<div>
										<div className={cl.main__header_info}>
											Все друзья <span>{friends?.length}</span>
										</div>
									</div>
								</div>
								<button onClick={() => setIsGlobal(!isGlobal)} className={isGlobal ? cl.active : ""}>
									Найти друзей
								</button>
							</div>
							<form className={cl.main__form}>
								<i className="bi bi-search"></i>
								<input
									type="text"
									src={inputName}
									onChange={event_ => setInputName(event_.target.value)}
									placeholder={(isGlobal ? "Глобальный п" : "П") + "оиск друзей"}
								/>
							</form>
							<div className={cl.main__friends}>
								{filteredFriends?.map(friend => (
									<div key={friend._id} className={cl.main__friends_item}>
										<Link to={`/user${friend._id}`}>
											<img src={friend.picture ?? userpic} alt={"pic for " + friend.firstName}/>
										</Link>
										<div className={cl.main__friends_item__info}>
											<Link to={`/user${friend._id}`}>
												<p><b>{friend.firstName} {friend.lastName}</b></p>
											</Link>
											<div>
												<button onClick={() => {
													setFriendTo(friend);
													setVisibleModal(true);
												}}>Написать сообщение
												</button>
											</div>
										</div>
									</div>

								))}

							</div>

						</div>
					}
					<MyModal setVisible={setVisibleModal} visible={visibleModal}>
						<div className={cl.modal}>
							<Link to={`/user${friendTo._id}`}>
								<div className={cl.modal_header}>
									<img src={friendTo.picture ?? userpic} alt={"pic for " + friendTo.firstName}/>
									<p><b>{friendTo.firstName} {friendTo.lastName}</b></p>
								</div>
							</Link>
							<div className={cl.modal_message}>
								<MessageInput
									sendMessage={(message) => MessageService.addMessage(message)}
									message={{user: loggedUserId, roomId: createRoomId(friendTo._id, loggedUserId)}}
								/>
							</div>
							<div className={cl.modal_link}>
								<Link to={`/messages/${createRoomId(friendTo._id, loggedUserId)}`}>
									К диалогу
								</Link>
							</div>
						</div>
					</MyModal>
					{/*<div className={cl.nav}>*/}
					{/*	<ul>*/}
					{/*		<li>Первое</li>*/}
					{/*		<li>Второе</li>*/}
					{/*		<li>Третье</li>*/}
					{/*	</ul>*/}

					{/*</div>*/}
				</div>
			</div>
		</div>
	);
};

export default Friends;
import {useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../../components/UI/Loader/Loader";
import UserService from "../../API/UserService";
import PostList from "../../components/Post/PostList";
import {getPageCount} from "../../utils/pages";
import {useObserver} from "../../hooks/useObserver";
import userpic from "../../assets/userpic.jpeg";
import FlexibleInput from "../../components/UI/FlexibleInput/FlexibleInput.jsx";
import cl from "./UserPage.module.css";
import MyModal from "../../components/UI/MyModal/MyModal";
import ImageUploader from "../../components/UI/ImageUploader/ImageUploader";
import PostForm from "../../components/Post/PostForm/PostForm.jsx";
import {USER_ID} from "../../constants";

const determineIsFriend = (userFriendsId, friendId) => {
	console.log(`determineIsFriend(${userFriendsId}, ${friendId})`);
	if (userFriendsId.length === 0) {
		return false;
	}
	for (let userFriendId of userFriendsId) {
		if (userFriendId === friendId) {
			return true;
		}
	}
	return false;
}

const UserPage = () => {

		const LIMIT_POSTS = 10;
		const parameters = useParams();
		const pageUserId = parameters.id;
		const loggedUserId = localStorage.getItem(USER_ID);
		console.log("pageUserId:", pageUserId, parameters, loggedUserId);
		const isOwner = pageUserId === loggedUserId;

		const [user, setUser] = useState({});
		const [showAllFriends, setShowAllFriends] = useState(false);
		const [pagePost, setPagePost] = useState(1);
		const [posts, setPosts] = useState([]);
		const [totalPosts, setTotalPosts] = useState(0);
		const [totalPages, setTotalPages] = useState(0);
		const [isFriend, setIsFriend] = useState(false);
		const lastElement = useRef();

		const [showImageUploader, setShowImageUploader] = useState(false);


		const [editedFirstName, setEditedFirstName] = useState("");
		const [editedLastName, setEditedLastName] = useState("");

		const addFriend = async  () => {
			await UserService.addFriend(loggedUserId, pageUserId)
				.then(() => console.debug("successfully added friend"));
			setIsFriend(true);
		};

		const deleteFriend = async () => {
			await UserService.deleteFriend(loggedUserId, pageUserId)
				.then(() => console.debug("successfully deleted friend"));
			setIsFriend(false);
		}

		const [fetchUserForPage, isLoading, _error] = useFetching(async () => {
			let resp = await UserService.getFullById(pageUserId);
			let user = resp.body;

			setUser(user);

			if (!isOwner) {
				let resp = await UserService.getById(loggedUserId);
				let loggedUser = resp.body;
				console.debug("logged user:", loggedUser);
				const _isFriend = determineIsFriend(loggedUser.friends, pageUserId);
				console.debug("isFriend", _isFriend);
				setIsFriend(_isFriend);
			} else {
				console.debug("Owner page, welcome!");
				console.debug(`editedFirstName=${user.firstName}, editedLastName=${user.lastName}`);
				setEditedFirstName(user.firstName);
				setEditedLastName(user.lastName);
			}
		});

		const [fetchPosts, isPostsLoading, _postError] = useFetching(async (isAnotherId) => {
			let response = await UserService.getUserPosts(pageUserId, LIMIT_POSTS, pagePost);
			if (isAnotherId) {
				setPosts([...response.body]);
			} else {
				setPosts([...posts, ...response.body]);
			}
			const totalCount = response.count;
			console.log("totalCount:", totalCount);
			setTotalPosts(totalCount);
			setTotalPages(getPageCount(totalCount, LIMIT_POSTS));
		});

		useObserver(lastElement, pagePost < totalPages, isPostsLoading,
			() => {
				setPagePost(pagePost + 1);

				console.debug('useObserver');
				console.debug('pagePost', pagePost + 1);
			});

		useEffect(() => {
			console.log("fetch user for page");
			fetchUserForPage();
		}, [pageUserId]);


		useEffect(() => {
			console.log("fetch posts");
			fetchPosts();
		}, [pagePost]);

		useEffect(() => {
			console.log("fetch posts with another id");
			fetchPosts(true);
		}, [pageUserId]);


		const changeName = async (event_) => {
			event_.preventDefault();
			await UserService.changeName(loggedUserId, editedFirstName, editedLastName)
				.then(() => console.debug("name changed successfully"));
		};

		const indexForFriendsArray = showAllFriends ? undefined : 6;

		/* todo: fix loader */
		return (
			<div className={cl.user_page + " justify-content-start"}>
				{isLoading ?
					<Loader/> : (
						<div className={cl.user_page__pic_name}>
							<div className={cl.user_page__pic_and_btns}>
								<div className={cl.user_pic}>
									<img src={user.picture ?? userpic} alt={"pic"}/>
								</div>
								<div className={cl.user_pic_btns}>
									{isOwner &&
										<button onClick={() => setShowImageUploader(true)}>
											Загрузить фото
										</button>
									}
									{!isOwner && (!isFriend ?
										(<button onClick={addFriend}>
											Добавить в друзья
										</button>) :
										(<button className={cl.danger} onClick={deleteFriend}>
											Удалить из друзей
										</button>))
									}
								</div>
							</div>
							<div className={cl.user_page__info_stats}>
								<div className={cl.user_page__info}>
									{isOwner ? (
											<form onSubmit={changeName}>
												<FlexibleInput
													content={editedLastName}
													onChange={event_ => setEditedLastName(event_.target.value)}
												/>
												<FlexibleInput
													content={editedFirstName}
													onChange={event_ => setEditedFirstName(event_.target.value)}
												/>
												<button type="submit" hidden/>
											</form>
										) :
										(<h1>{user.lastName} {user.firstName}</h1>)
									}
									<hr/>
								</div>
								<div className={cl.user_page__stats}>
									Заготовка для статистики
								</div>
							</div>
						</div>
					)}

				<div style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center'
				}}>
					{isLoading ?
						<Loader/> : (
							<div className={cl.user_page__friends}>
								<Link to={`/friends/${isOwner ? "" : pageUserId}`}>
									<div className={cl.user_page__friends_header}>
										<div>Друзья</div>
										<div>
											<p>{user?.friends?.length}</p>
										</div>
									</div>
								</Link>
								<div
									className={cl.user_page__friends_imgs}
									onClick={() => setShowAllFriends(!showAllFriends)}
								>
									{
										user?.friends?.slice(0, indexForFriendsArray)?.map(element =>
											(<Link key={element._id} to={"/user" + element._id} className="tooltip">
													<span className="tooltiptext">{element.lastName} {element.firstName}</span>
													<img src={element.picture ?? userpic} alt="pic"/>
												</Link>
											)
										)
									}
								</div>
							</div>
						)}
					<div style={{flex: 5}}>
						<div className={cl.user_page__posts_header}>
							<div>
								<p>Посты</p>
								<p>{totalPosts}</p>
							</div>
							{isOwner && <PostForm/>}
						</div>
						<div>
							{isPostsLoading && <Loader/>}
							<PostList
								remove={Object.create(null)}
								posts={posts}
							/>
							<div ref={lastElement} style={{height: 20}}/>
						</div>
					</div>
				</div>
				{isOwner && !isLoading &&
					<MyModal
						visible={showImageUploader}
						setVisible={setShowImageUploader}
					>
						<ImageUploader
							currentImg={user.picture ?? userpic}
						/>
					</MyModal>
				}
			</div>
		);
	}
;

export default UserPage;
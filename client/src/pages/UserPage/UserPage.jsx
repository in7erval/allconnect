import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import UserService from "../../API/UserService";
import PostList from "../../components/Post/PostList";
import userpic from "../../assets/userpic.jpeg";
import FlexibleInput from "../../components/UI/FlexibleInput/FlexibleInput.jsx";
import cl from "./UserPage.module.css";
import MyModal from "../../components/UI/MyModal/MyModal";
import ImageUploader from "../../components/UI/ImageUploader/ImageUploader";
import PostForm from "../../components/Post/PostForm/PostForm.jsx";
import Status from "../../components/UI/Status/Status";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const determineIsFriend = (userFriendsId, friendId) => {
	return userFriendsId.map(element => element._id).includes(friendId);
}

const UserPage = () => {
		const LIMIT_POSTS = 10;
		const pageUserId = useParams().id;
		const {store} = useContext(Context);
		// store.setActivePage(USER_PAGE);
		const loggedUserId = store.userId;
		const isOwner = pageUserId === loggedUserId;
		const [showAllFriends, setShowAllFriends] = useState(false);
		const [isFriend, setIsFriend] = useState(false);
		const {ref: lastElement, inView} = useInView();
		const [showImageUploader, setShowImageUploader] = useState(false);
		const [editedFirstName, setEditedFirstName] = useState("");
		const [editedLastName, setEditedLastName] = useState("");

		const addFriend = async () => {
			await UserService.addFriend(loggedUserId, pageUserId)
				.then(() => console.debug("successfully added friend"))
				.catch(error => store.addError(error));
			setIsFriend(true);
		};

		const deleteFriend = async () => {
			await UserService.deleteFriend(loggedUserId, pageUserId)
				.then(() => console.debug("successfully deleted friend"))
				.catch(error => store.addError(error));
			setIsFriend(false);
		}

		const fetchUser = async () => {
			return UserService.getFullById(pageUserId);
		}

		const {
			isLoading: isLoadingUser,
			isFetching,
			data: userResponse,
			refetch: refetchUser
		} = useQuery([`user${pageUserId}`], fetchUser);

		useEffect(() => {
			if (!isFetching) {
				console.log(userResponse);
				if (!isOwner) {
					setIsFriend(determineIsFriend(userResponse.data.friends, loggedUserId));
				} else {
					console.debug("Owner page, welcome!");
					console.debug(`editedFirstName=${userResponse.data.firstName}, editedLastName=${userResponse.data.lastName}`);
					setEditedFirstName(userResponse.data.firstName);
					setEditedLastName(userResponse.data.lastName);
				}
			}
		}, [isFetching]);

		const fetchPosts = ({pageParam: pageParameter = 1}) => {
			return UserService.getUserPosts(pageUserId, LIMIT_POSTS, pageParameter);
		}

		const {
			isLoading: isLoadingPosts,
			data: postsData,
			fetchNextPage,
			hasNextPage,
			refetch
		} = useInfiniteQuery(['userPosts'], fetchPosts, {
			getNextPageParam: (lastPage, _pages) => {
				let lastPageNumber = lastPage.config.params.page;
				return LIMIT_POSTS * lastPageNumber < lastPage.data.count ? lastPageNumber + 1 : undefined;
			},
		});

		useEffect(() => {
			console.log("fetch posts with another id");
			refetch();
			refetchUser();
		}, [pageUserId]);

		useEffect(() => {
			if (inView && hasNextPage) {
				fetchNextPage();
			}
		}, [inView]);


		const changeName = async (event_) => {
			event_.preventDefault();
			await UserService.changeName(loggedUserId, editedFirstName, editedLastName)
				.then(() => console.debug("name changed successfully"))
				.catch(error => store.addError(error));
		};

		const indexForFriendsArray = showAllFriends ? undefined : 6;

		/* todo: fix loader */
		return (
			<div className={cl.user_page + " justify-content-start"}>
				{isLoadingUser ?
					<Loader/> : (
						<div className={cl.user_page__pic_name}>
							<div className={cl.user_page__pic_and_btns}>
								<div className={cl.user_pic}>
									<img src={userResponse.data.picture ?? userpic} alt={"Изображение недоступно"}/>
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
									<div style={{display: "flex", flexDirection: "column"}}>
										<div style={{marginRight: -15, marginTop: -15, height: 20, alignSelf: "flex-end"}}>
											<Status userId={pageUserId}/>
										</div>

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
											(<h1>{userResponse.data.lastName} {userResponse.data.firstName}</h1>)
										}

									</div>
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
					{isLoadingUser ?
						<Loader/> : (
							<div className={cl.user_page__friends}>
								<Link to={`/friends/${isOwner ? "" : pageUserId}`}>
									<div className={cl.user_page__friends_header}>
										<div>Друзья</div>
										<div>
											<p>{userResponse.data?.friends?.length}</p>
										</div>
									</div>
								</Link>
								<div className={cl.user_page__friends_imgs}>
									{userResponse.data?.friends?.slice(0, indexForFriendsArray)?.map(element =>
										(<Link key={element._id} to={"/user" + element._id} className="tooltip">
												<span className="tooltiptext">{element.lastName} {element.firstName}</span>
												<img src={element.picture ?? userpic} alt="Изображение недоступно"/>
												<div style={{position: "relative", top: -20, right: 10}}>
													<Status userId={element._id} disableHover={true}/>
												</div>
											</Link>
										)
									)
									}
								</div>
								{userResponse.data?.friends?.length > 6 &&
									<button className={cl.user_page__friends_imgs__helper_btn}
													onClick={() => setShowAllFriends(!showAllFriends)}>
										{showAllFriends ? "Скрыть" : "Показать всех"}
									</button>
								}
							</div>
						)}

					<div style={{flex: 5}}>
						<div className={cl.user_page__posts_header}>
							<div>
								<p>Посты</p>
								<p>{isLoadingPosts ? "загрузка..." : postsData.pages[0].data.count}</p>
							</div>
							{isOwner && <PostForm/>}
						</div>
						<div>
							{isLoadingPosts ? <Loader/> : postsData.pages.map((group, index) => (
								<React.Fragment key={index}>
									<PostList
										remove={() => console.log("remove")}
										posts={group.data.body}
									/>
								</React.Fragment>
							))}
							<div ref={lastElement} style={{height: 20}}/>
						</div>
					</div>

				</div>
				{isOwner && !isLoadingUser &&
					<MyModal
						visible={showImageUploader}
						setVisible={setShowImageUploader}
					>
						<ImageUploader
							currentImg={userResponse.data?.picture ?? userpic}
						/>
					</MyModal>
				}
			</div>
		);
	}
;

export default observer(UserPage);
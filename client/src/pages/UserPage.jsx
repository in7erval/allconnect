import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
import UserService from "../API/UserService";
import AsideNav from "../components/AsideNav/AsideNav";
import PostList from "../components/PostList";
import {getPageCount} from "../utils/pages";
import {useObserver} from "../hooks/useObserver";

const UserPage = () => {

	const LIMIT_POSTS = 10;

	const params = useParams();
	console.log(params);
	const [user, setUser] = useState({});
	const [friends, setFriends] = useState([]);
	const [showAllFriends, setShowAllFriends] = useState(false);
	const [pagePost, setPagePost] = useState(1);
	const [posts, setPosts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const lastElement = useRef();

	const [fetchUserById, isLoading, error] = useFetching(async (id) => {
		UserService.getFullById(id)
			.then(resp => {
				setUser(resp);
				return resp
			})
			.then((response) =>
				Promise.all(response.friends?.map(el => UserService.getFullById(el)))
			)
			.then(res => setFriends(res));
	});

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		let response = await UserService.getUserPosts(params.id, LIMIT_POSTS, pagePost);
		setPosts([...posts, ...response.body]);
		const totalCount = response.count;
		console.log("totalCount: ", totalCount);
		setTotalPages(getPageCount(totalCount, LIMIT_POSTS));
	});

	useObserver(lastElement, pagePost < totalPages, isPostsLoading,
		() => {
			setPagePost(pagePost + 1);
			console.log('useObser');
		});

	useEffect(() => {
		console.log("params.id,", params.id);
		fetchUserById(params.id);
		// fetchComments(params.id);
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [pagePost]);

	/* todo: fix loader */
	return (
		<div className="default_page">
			<AsideNav/>
			<div className="default_page__content justify-content-start padding-25">
				{isLoading ?
					<Loader/> :
					<div className="user_page">
						<div className="user_page__pic_name">
							<div className="user_page__pic_and_btns">
								<div className="user_pic">
									<img src={user.picture} alt={"pic"}/>
								</div>
								<div className="user_pic_btns">
									<div onClick={() => console.log('click')}>
										Сделать что-то
									</div>
									<div onClick={() => console.log('click')}>
										Сделать ещё что-то
									</div>
								</div>

							</div>
							<div className="user_page__info">
								<h1>{user.firstName} {user.lastName}</h1>
								<hr/>
								<p>
									Сделал{user.title === 'mrs' && 'a'} записей: {user.postsDone}
								</p>
								<p>
									Написал{user.title === 'mrs' && 'a'} комментариев: {user.commentsWrote}
								</p>
								<p>
									Друзей: {user?.friends?.length}
								</p>
							</div>


						</div>
						<div style={{
							display: 'flex'
						}}>
							<div className="user_page__friends"
									 onClick={() => setShowAllFriends(!showAllFriends)}>
								{showAllFriends ?
									friends?.map(el =>
										(<a key={el._id} href={"/user" + el._id}>
												<img src={el.picture} alt="pic"/>
											</a>
										)
									) :
									friends?.slice(0, 6).map(el =>
										(<a key={el._id} href={"/user" + el._id}>
												<img src={el.picture} alt="pic"/>
											</a>
										)
									)
								}
							</div>
							<PostList
								remove={null}
								posts={posts}
							/>
						</div>


						<div ref={lastElement} style={{height: 20}}/>
					</div>
				}
			</div>
		</div>
	);
};

export default UserPage;
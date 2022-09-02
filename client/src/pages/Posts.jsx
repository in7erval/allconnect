import React, {useContext, useEffect} from 'react';
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/Post/PostList";
import PostService from "../API/PostService";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

function Posts() {
	const LIMIT_POSTS = 10;
	const {store} = useContext(Context);
	// store.setActivePage(POSTS_PAGE);
	const userId = store.userId;
	const {ref: lastElement, inView} = useInView();

	const fetchPosts = ({pageParam: pageParameter = 1}) => {
		return PostService.getAllForUser(userId, LIMIT_POSTS, pageParameter);
	}

	const {
		isLoading,
		data,
		fetchNextPage,
		hasNextPage,
		refetch
	} = useInfiniteQuery(['posts'], fetchPosts, {
		getNextPageParam: (lastPage, _pages) => {
			let lastPageNumber = lastPage.config.params.page;
			return LIMIT_POSTS * lastPageNumber < lastPage.data.count ? lastPageNumber + 1 : undefined;
		},
	});

	useEffect(() => {
		refetch();
	}, [userId]);

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView]);

	return (
		<div style={{width: '100%'}}>
			{isLoading ?
				<div style={{
					display: "flex",
					justifyContent: 'center',
					marginTop: 50
				}}>
					<Loader/>
				</div>
				:
				data.pages.map((group, index) => (
					<React.Fragment key={index}>
						<PostList
							remove={() => console.log("remove")}
							posts={group.data.body}
						/>
					</React.Fragment>
				))
			}
			<div ref={lastElement} style={{height: 20}}/>
		</div>
	);
}

export default observer(Posts);
import {useEffect, useRef, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/Post/PostList";
import {useObserver} from "../hooks/useObserver";
import AsideNav from "../components/AsideNav/AsideNav";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const LIMIT_POSTS = 10;
	const [page, setPage] = useState(1);
	const lastElement = useRef();
	const userId = localStorage.getItem("userId");

	const [fetchPosts, isPostsLoading, _postError] = useFetching(async () => {
		let response = await PostService.getAllForUser(LIMIT_POSTS, page, userId);
		setPosts([...posts, ...response.body]);
		const totalCount = response.count;
		console.log("totalCount:", totalCount);
		setTotalPages(getPageCount(totalCount, LIMIT_POSTS));
	});

	useEffect(() => {
		fetchPosts();
	}, [page]);

	useObserver(lastElement, page < totalPages, isPostsLoading,
		() => {
			setPage(page + 1);
			console.log('useObser');
		});

	return (
		<div className="default_page">
			<AsideNav/>
			<div className="default_page__content">
				<PostList
					remove={Object.create(null)}
					posts={posts}
				/>
				{isPostsLoading &&
					<div style={{
						display: "flex",
						justifyContent: 'center',
						marginTop: 50
					}}>
						<Loader/>
					</div>
				}
				<div ref={lastElement} style={{height: 20}}/>
			</div>
		</div>

	);
}

export default Posts;
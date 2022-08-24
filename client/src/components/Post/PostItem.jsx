import {useEffect, useState} from 'react';
import Comments from "./Comments/Comments.jsx";
import cl from "./Post.module.css";

import 'bootstrap-icons/font/bootstrap-icons.css';
import PostService from "../../API/PostService";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const PostItem = ({post}) => {

	const loggedUserId = localStorage.getItem("userId");
	const [showComments, setShowComments] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [invertHeartIcon, setInvertHeartIcon] = useState(false); //fixme: это дно, пофикси
	const [isLiked, setIsLiked] = useState(post.likes.includes(loggedUserId));
	const [likesCount, setLikesCount] = useState(post.likes.length);
	const [commentsCount, setCommentsCount] = useState(post.comments.length);

	console.log("comments", post.comments);

	useEffect(() => {
		setIsOwner(loggedUserId === post.owner._id);
	}, []);

	const deletePost = () => {
		console.log("delete post");
	}

	const addOrRemoveLike = async () => {
		if (isLiked) {
			await PostService.deleteLike(post._id, loggedUserId);
			setLikesCount(likesCount - 1);
		} else {
			await PostService.addLike(post._id, loggedUserId);
			setLikesCount(likesCount + 1);
		}
		setIsLiked(!isLiked);
		setInvertHeartIcon(false);
	}

	return (<div className={cl.post}>
			<Link to={`/user${post.owner._id}`}>
				<div className={cl.post__owner}>
					<img src={post.owner.picture} alt="owner"/>
					<p>
						{`${post.owner.firstName} ${post.owner.lastName}`}
					</p>
				</div>
			</Link>
			<div>
				<div className={cl.post__publish_date}>
					{new Date(post.publishDate).toLocaleString()}
				</div>
				<div className={cl.post__content}>
					{post.image && <img src={post.image} alt="Pic"/>}
					<div>
						{post.text}
					</div>
				</div>
			</div>

			{showComments &&
				<Comments
					postId={post._id}
					setCommentsCount={setCommentsCount}
				/>
			}
			<div className={cl.post__btns}>
				{/*<MyButton onClick={() => props.remove(props.post)}>*/}
				{/*	Удалить*/}
				{/*</MyButton>*/}
				<div className={cl.post__btns__like_comment}>
					<button className={cl.post__btns__like}
									onMouseEnter={_event => setInvertHeartIcon(true)}
									onMouseLeave={_event => setInvertHeartIcon(false)}
									onClick={addOrRemoveLike}
					>
						{isLiked ?
							(!invertHeartIcon ?
								<i className={"bi bi-heart-fill " + cl.heart_fill + " " + cl.bi_heart_fill_color}></i> :
								<i className={"bi bi-heart"}></i>)
							:
							(!invertHeartIcon ?
									<i className={"bi bi-heart"}></i> :
									<i className={"bi bi-heart-fill " + cl.heart_fill + " " + cl.bi_heart_fill_color}></i>
							)
						}
						<div style={{marginLeft: '5px'}}>
							{likesCount}
						</div>

					</button>
					<button onClick={() => setShowComments(!showComments)}>
						<i className="bi bi-chat-left-dots"></i>
						<div style={{marginLeft: '5px'}}>
							{commentsCount}
						</div>
					</button>
				</div>
				{isOwner &&
					<button onClick={deletePost} className={cl.post__btns_btn_delete}>
						{/*Удалить*/}
					</button>
				}
			</div>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired
}

export default PostItem;
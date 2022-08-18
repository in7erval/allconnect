import React, {useEffect, useRef, useState} from 'react';
import Comments from "./Comments/Comments.jsx";
import cl from "./Post.module.css";

import 'bootstrap-icons/font/bootstrap-icons.css';
import PostService from "../../API/PostService";

const PostItem = (props) => {

		const [showComments, setShowComments] = useState(false);
		const [showImage, setShowImage] = useState(false);
		const loggedUserId = localStorage.getItem("userId");
		const [isOwner, setIsOwner] = useState(false);
		const [invertHeartIcon, setInvertHeartIcon] = useState(false);
		const [isLiked, setIsLiked] = useState(props.post.likes.includes(loggedUserId));
		const [likesCount, setLikesCount] = useState(props.post.likes.length);
		const [commentsCount, setCommentsCount] = useState(props.post.comments.length);
		const ref = useRef();

		console.log("comments", props.post.comments);

		useEffect(() => {
			setIsOwner(loggedUserId === props.post.owner._id);
			const rand = Math.random() > 0.3;
			setShowImage(rand);
		}, []);

		const deletePost = () => {
			console.log("delete post");
		}

		const addOrRemoveLike = async () => {
			// ref.current.className = ref.current.className + " " + cl.pause;

			if (isLiked) {
				await PostService.deleteLike(props.post._id, loggedUserId);
				setLikesCount(likesCount - 1);
			} else {
				await PostService.addLike(props.post._id, loggedUserId);
				setLikesCount(likesCount + 1);
			}

			setIsLiked(!isLiked);
			setInvertHeartIcon(false);
		}

		return (<div className={cl.post}>
				<a href={`/user${props.post.owner._id}`}>
					<div className={cl.post__owner}>
						<img src={props.post.owner.picture} alt="owner"/>
						<p>
							{`${props.post.owner.firstName} ${props.post.owner.lastName}`}
						</p>
					</div>
				</a>
				<div>
					<div className={cl.post__publish_date}>
						{new Date(props.post.publishDate).toLocaleString()}
					</div>
					<div className={cl.post__content}>
						{/** FIXME: delete showImage! */}
						{showImage && props.post.image && <img src={props.post.image} alt="Pic"/>}
						<div>
							{props.post.text}
						</div>
					</div>
				</div>

				{showComments && <Comments comments={props.post.comments}
																	 postId={props.post._id}
																	 setCommentsCount={setCommentsCount}
				/>}
				<div className={cl.post__btns}>
					{/*<MyButton onClick={() => props.remove(props.post)}>*/}
					{/*	Удалить*/}
					{/*</MyButton>*/}
					<div className={cl.post__btns__like_comment}>
						<button className={cl.post__btns__like}
										onMouseEnter={e => {
											console.log("enter");
											setInvertHeartIcon(true);
										}}
										onMouseLeave={e => {
											console.log("leave");
											setInvertHeartIcon(false);
										}}
										onClick={addOrRemoveLike}
										ref={ref}
						>
							{isLiked ?
								(!invertHeartIcon ?
									<i className={"bi bi-heart-fill " + cl.heart_fill + " " + cl.bi_heart_fill_color}></i> :
									<i className={"bi bi-heart"}></i>)
								: (!invertHeartIcon ?
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
							Удалить
						</button>
					}
				</div>
			</div>
		)
			;
	}
;

export default PostItem;
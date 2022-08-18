import React, {useEffect, useState, useRef} from 'react';
import Comment from "./Comment.jsx";
import cl from './Comment.module.css';
import TextareaAutosize from "react-textarea-autosize";
import arrow from "../../../assets/send.svg";
import useComments from "../../../hooks/useComments";

const Comments = (props) => {

	const [commentMsg, setCommentMsg] = useState("");
	const refComments = useRef();
	// const [comments, setComments] = useState(props.comments);

	const {comments, log, sendComment, removeComment} = useComments(props.postId)

	console.log(comments);

	const sendCommentAction = () => {
		if (commentMsg !== "") {
			sendComment(commentMsg);
			setCommentMsg("");
		}
	};

	const scrollToBottom = () => {
		if (refComments.current) {
			refComments.current.scrollTop = refComments.current.scrollHeight;
		}
	}

	useEffect(() => {
		// скролл до низа при рендере
		scrollToBottom();
	}, []);

	useEffect(() => {
		console.log("comments.length", comments.length);
		props.setCommentsCount(comments.length);
		scrollToBottom();
	}, [comments]);

	return (
		<div>
			{comments.length !== 0 &&
				<div className={cl.comments} ref={refComments}>
					{comments.map(el =>
						<Comment key={el._id}
										 ownerId={el.owner._id}
										 pic={el.owner.picture}
										 firstName={el.owner.firstName}
										 lastName={el.owner.lastName}
										 message={el.message}
						/>)
					}
				</div>
			}

			<div className={cl.comment__msg}>
				<TextareaAutosize
					value={commentMsg}
					placeholder="Напиши что думаешь об этом..."
					onChange={e => {
						setCommentMsg(e.target.value);
					}}
					onKeyPress={(e) => {
						if (e.code === "Enter" && !e.shiftKey) {
							console.log("send comment!");
							e.preventDefault();
							sendCommentAction();
						}
					}}
				/>
				<button className={cl.comment__msg_img} onClick={sendCommentAction}>
					<img src={arrow} alt="send"/>
				</button>
			</div>
		</div>
	);
};

export default Comments;
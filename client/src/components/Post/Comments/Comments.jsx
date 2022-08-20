import {useEffect, useState, useRef} from 'react';
import Comment from "./Comment.jsx";
import cl from './Comment.module.css';
import TextareaAutosize from "react-textarea-autosize";
import arrow from "../../../assets/send.svg";
import useComments from "../../../hooks/useComments";
import PropTypes from "prop-types";

const Comments = ({postId, setCommentsCount}) => {

	const [commentMessage, setCommentMessage] = useState("");
	const referenceComments = useRef();

	const {comments, _log, sendComment, _removeComment} = useComments(postId);

	console.log(comments);

	const sendCommentAction = () => {
		if (commentMessage !== "") {
			sendComment(commentMessage);
			setCommentMessage("");
		}
	};

	const scrollToBottom = () => {
		if (referenceComments.current) {
			referenceComments.current.scrollTop = referenceComments.current.scrollHeight;
		}
	}

	useEffect(() => {
		// скролл до низа при рендере
		scrollToBottom();
	}, []);

	useEffect(() => {
		console.log("comments.length", comments.length);
		setCommentsCount(comments.length);
		scrollToBottom();
	}, [comments]);

	return (
		<div>
			{comments.length > 0 &&
				<div className={cl.comments} ref={referenceComments}>
					{comments.map(element =>
						<Comment
							key={element._id}
							ownerId={element.owner._id}
							pic={element.owner.picture}
							firstName={element.owner.firstName}
							lastName={element.owner.lastName}
							message={element.message}
						/>)
					}
				</div>
			}

			<div className={cl.comment__msg}>
				<TextareaAutosize
					value={commentMessage}
					placeholder="Напиши что думаешь об этом..."
					onChange={event_ => {
						setCommentMessage(event_.target.value);
					}}
					onKeyPress={(event_) => {
						if (event_.code === "Enter" && !event_.shiftKey) {
							console.log("send comment!");
							event_.preventDefault();
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

Comments.propTypes = {
	postId: PropTypes.string.isRequired,
	setCommentsCount: PropTypes.func.isRequired
}

export default Comments;
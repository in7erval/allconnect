import React, {useState} from 'react';
import Comment from "./Comment.jsx";
import cl from './Comment.module.css';
import TextareaAutosize from "react-textarea-autosize";
import CommentService from "../../../../API/CommentService";
import arrow from "../../../../assets/send.svg";

const Comments = (props) => {

	const [commentMsg, setCommentMsg] = useState("");
	const [comments, setComments] = useState(props.comments);

	const loggedUserId = localStorage.getItem("userId");

	const sendComment = () => {
		if (commentMsg !== "") {
			CommentService.addComment(props.postId, loggedUserId, commentMsg)
				.then(res => {
					if (res.error == null) {
						setComments([res.body, ...comments]);
						setCommentMsg("");
						console.log(res);
						console.log("comment added");
					}
				});
		}
	}

	return (
		<div>
			{comments.length !== 0 &&
				<div className={cl.comments}>
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
							sendComment();
						}
					}}
				/>
				<div className={cl.comment__msg_img}>
					<img src={arrow} alt="send" onClick={sendComment}/>
				</div>
			</div>
		</div>
	);
};

export default Comments;
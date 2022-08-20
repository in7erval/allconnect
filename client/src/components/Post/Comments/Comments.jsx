import {useEffect, useState, useRef, useMemo} from 'react';
import Comment from "./Comment.jsx";
import cl from './Comment.module.css';
import TextareaAutosize from "react-textarea-autosize";
import arrow from "../../../assets/send.svg";
import useComments from "../../../hooks/useComments";
import PropTypes from "prop-types";

const datetimeToDate = datetime => new Date(datetime).toLocaleDateString();

const groupComments = (comments) => {
	let commentsMap = new Map();

	for (let element of comments) {
		let date = datetimeToDate(element.publishDate);
		let newElement = {...element, continuous: false};
		if (commentsMap.has(date)) {
			commentsMap.get(date).push(newElement);
		} else {
			commentsMap.set(date, [newElement]);
		}
	}

	for (let elements of commentsMap.values()) {
		elements.sort((firstElement, secondElement) => {
			let firstDate = new Date(firstElement.publishDate);
			let secondDate = new Date(secondElement.publishDate);
			return firstDate - secondDate;
		});
	}

	for (let commentsValue of commentsMap.values()) {
		if (commentsValue.length > 1) {
			for (let index = 0; index < commentsValue.length - 1; index++) {
				if (commentsValue[index].owner._id === commentsValue[index + 1].owner._id) {
					commentsValue[index].continuous = true;
				}
			}
		}
	}

	return commentsMap;
}

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

	const commentsMap = useMemo(() => groupComments(comments), [comments]);

	console.log(commentsMap);

	return (
		<div>
			{comments.length > 0 &&
				<div className={cl.comments} ref={referenceComments}>

					{[...commentsMap.keys()].map(key =>
						(<div key={key}>
								<div className={cl.comment_date}>
									{key}
								</div>
								{commentsMap.get(key).map(element => (
									<Comment
										key={element._id}
										ownerId={element.owner._id}
										pic={element.owner.picture}
										firstName={element.owner.firstName}
										lastName={element.owner.lastName}
										message={element.message}
										publishDate={element.publishDate}
										continuous={element.continuous}
									/>
								))}
							</div>
						)
					)
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
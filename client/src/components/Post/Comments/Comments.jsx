import {useContext, useEffect, useMemo, useRef, useState} from 'react';
import Comment from "./Comment.jsx";
import cl from './Comment.module.css';
import TextareaAutosize from "react-textarea-autosize";
import arrow from "../../../assets/send.svg";
import PropTypes from "prop-types";
import CommentsService from "../../../API/CommentsService";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const datetimeToDate = datetime => new Date(datetime).toLocaleDateString();

const sortDate = (dateString1, dateString2) => {
	let firstDate = new Date(dateString1);
	let secondDate = new Date(dateString2);
	return firstDate - secondDate;
}

const sortDateParsed = (dateString1, dateString2) => {
	let firstDate = Date.parse(dateString1.replace('.', '-'));
	let secondDate = Date.parse(dateString2.replace('.', '-'));
	return firstDate - secondDate;
}

const groupComments = (comments) => {
	let commentsMap = new Map();

	for (let element of comments) {
		let date = new Date(element.publishDate).toDateString();
		let newElement = {...element, continuous: false};
		if (commentsMap.has(date)) {
			commentsMap.get(date).push(newElement);
		} else {
			commentsMap.set(date, [newElement]);
		}
	}

	for (let elements of commentsMap.values()) {
		elements.sort((firstElement, secondElement) => {
			return sortDate(firstElement.publishDate, secondElement.publishDate);
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

	const {store} = useContext(Context);
	const [commentMessage, setCommentMessage] = useState("");
	const referenceComments = useRef();

	const [comments, setComments] = useState([]);

	// const {comments, sendComment, _removeComment} = useComments(postId);

	useEffect(() => {
		initComments();
		subscribe()
	}, []);

	const initComments = async () => {
		const {data} = await CommentsService.getAll(postId);
		setComments(data.body);
	}

	const subscribe = async () => {
		try {
			const {data} = await CommentsService.getOne();
			console.log(data);
			setComments(previous => [data.body, ...previous]);
			await subscribe();
		} catch (_error) {
			console.error(_error);
			setTimeout(() => {
				subscribe()
			}, 500);
		}
	}

	const sendComment = async () => {
		await CommentsService.add({
			text: commentMessage,
			userId: store.userId,
			postId
		})
	}

	const sendCommentAction = () => {
		if (commentMessage !== "") {
			sendComment();
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

					{[...commentsMap.keys()].sort(sortDateParsed).map(key =>
						(<div key={key}>
								<div className={cl.comment_date}>
									{datetimeToDate(key)}
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
					)}
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

export default observer(Comments);
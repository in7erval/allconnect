import cl from "./Message.module.css";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {useInView} from "react-intersection-observer";
import userpic from "../../assets/userpic.jpeg";

const Message = (
	{
		message,
		onContextMenu,
		highlight,
		addToSeenBy,
		toUserId
	}
) => {
	const currentUserId = localStorage.getItem('userId');
	const {ref: reference, inView: isVisible} = useInView({
		threshold: 0.5,
		triggerOnce: true,
		delay: 1000,
		trackVisibility: true
	});

	const isCurrentUserMessage = message.user._id === currentUserId;

	const date = new Date(message.createdAt);
	const stringTime = date.toLocaleTimeString([], {timeStyle: 'short'});

	const tail = message.continuous ? cl.no_tail : "";

	let messageClass = (isCurrentUserMessage ? cl.from_me : cl.from_them) + " " + tail;

	useEffect(() => {
		if (isVisible && !isCurrentUserMessage && !message.seenBy.includes(currentUserId)) {
			addToSeenBy(message._id, currentUserId);
			message.seenBy.push(currentUserId);
		}
	}, [isVisible]);

	console.log("Render message", message.text, message);

	console.log("toUserId", toUserId);
	console.log("isCurrentUserMessage", isCurrentUserMessage);
	console.log("seenBy", message.seenBy);

	return (
		<div ref={reference}>
			<div className={`${cl.message} ${messageClass} ${highlight ? cl.highlight : ""}`}>
				{!isCurrentUserMessage &&
					<img
						src={message.user.picture ?? userpic}
						alt={"comment owner"}
						className={message.continuous ? cl.hide : ""}
					/>}
				<button onContextMenu={(event_) => onContextMenu(event_, message._id)}>
					<p className={messageClass}>
						{!isCurrentUserMessage &&
							<a className={cl.name} href={`/user${message.user._id}`}>{message.user.firstName}</a>}
						<span>
							{message.text}
							<span
								style={{
									margin: 0,
									padding: "0 0 0 10px",
									fontSize: 11,
									alignSelf: "end",
									display: "flex"
								}}
							>
								{stringTime}
								{message.seenBy.includes(isCurrentUserMessage ? toUserId : currentUserId) ?
									<i className="bi bi-check-all"></i> :
									<i className="bi bi-check"></i>}
							</span>
					</span>
					</p>

				</button>
			</div>
		</div>
	);
};

Message.propTypes = {
	message: PropTypes.object.isRequired,
	toUserId: PropTypes.string.isRequired,
	onContextMenu: PropTypes.func.isRequired,
	highlight: PropTypes.bool.isRequired,
	addToSeenBy: PropTypes.func.isRequired
}

export default Message;
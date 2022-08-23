import cl from "./Message.module.css";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";

const Message = (
	{
		pic,
		id,
		ownerId,
		firstName,
		message,
		onContextMenu,
		highlight,
		createdAt,
		continuous,
		seenBy,
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

	const [seenBySave, setSeenBySave] = useState(seenBy);

	console.log(seenBySave, currentUserId);

	//todo: если isVisible и не в seenBy,
	// кидаем запрос на добавление текущего id в seenBy

	const isCurrentUserMessage = ownerId === currentUserId;

	const date = new Date(createdAt);
	const stringTime = date.toLocaleTimeString([], {timeStyle: 'short'});

	const tail = continuous ? cl.no_tail : "";

	let messageClass = (isCurrentUserMessage ? cl.from_me : cl.from_them) + " " + tail;

	useEffect(() => {
		if (isVisible && !isCurrentUserMessage && !seenBySave.includes(currentUserId)) {
			console.log("message set seenBy", message, currentUserId);
			addToSeenBy(id, currentUserId);
			setSeenBySave([...seenBySave, currentUserId]);
		}
	}, [isVisible]);

	return (
		<div ref={reference}>
			<div className={`${cl.message} ${messageClass} ${highlight ? cl.highlight : ""}`}>
				{!isCurrentUserMessage &&
					<img
						src={pic}
						alt={"comment owner"}
						className={continuous ? cl.hide : ""}
					/>}
				<button onContextMenu={(event_) => onContextMenu(event_, id)}>
					<p className={messageClass}>
						{!isCurrentUserMessage && <a className={cl.name} href={`/user${ownerId}`}>{firstName}</a>}
						<span>
							{message}
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
								{seenBySave.includes(isCurrentUserMessage ? toUserId : currentUserId) ?
									<i className="bi bi-check-all"></i> : <i className="bi bi-check"></i>}
							</span>
					</span>
					</p>

				</button>
			</div>
		</div>
	);
};

Message.propTypes = {
	id: PropTypes.any.isRequired,
	ownerId: PropTypes.string.isRequired,
	toUserId: PropTypes.string.isRequired,
	pic: PropTypes.string.isRequired,
	continuous: PropTypes.bool.isRequired,
	createdAt: PropTypes.string.isRequired,
	firstName: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	onContextMenu: PropTypes.func.isRequired,
	highlight: PropTypes.bool.isRequired,
	seenBy: PropTypes.array.isRequired,
	addToSeenBy: PropTypes.func.isRequired
}

export default Message;
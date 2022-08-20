import cl from "./Message.module.css";
import PropTypes from "prop-types";

const Message = ({pic, id, ownerId, firstName, message, onContextMenu, highlight, createdAt, continuous}) => {

	const currentUserId = localStorage.getItem('userId');

	const isCurrentUserMessage = ownerId === currentUserId;

	const date = new Date(createdAt);
	const stringTime = date.toLocaleTimeString([], {timeStyle: 'short'});

	const tail = continuous ? cl.no_tail : "";

	let messageClass = (isCurrentUserMessage ? cl.from_me : cl.from_them) + " " + tail;

	// console.log(date.getHours(), date.getMinutes());

	return (
		<div>
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
						<div>
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
						</span>
						</div>
					</p>

				</button>
			</div>
		</div>

	);
};

Message.propTypes = {
	id: PropTypes.any.isRequired,
	ownerId: PropTypes.string.isRequired,
	pic: PropTypes.string.isRequired,
	continuous: PropTypes.bool.isRequired,
	createdAt: PropTypes.string.isRequired,
	firstName: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	onContextMenu: PropTypes.func.isRequired,
	highlight: PropTypes.bool.isRequired
}

export default Message;
import cl from "./Message.module.css";
import PropTypes from "prop-types";

const Message = ({pic, id, ownerId, firstName, message, onContextMenu, highlight}) => {

	const currentUserId = localStorage.getItem('userId');

	/* fixme: DELETE random(). fix on det continious comms */
	// const [tail, setTail] = useState(((Math.random() > 0.5) ? "" : (" " + cl.no_tail)));
	/* fixme: delete random */

	const isCurrentUserMessage = ownerId === currentUserId;

	let messageClass = isCurrentUserMessage ? cl.from_me : cl.from_them;

	return (
		<div>
			<div className={`${cl.message} ${messageClass} ${highlight ? cl.highlight : ""}`}>
				{!isCurrentUserMessage && <img src={pic} alt={"comment owner"}/>}
				<button onContextMenu={(event_) => onContextMenu(event_, id)}>
					<p className={messageClass}>
						{!isCurrentUserMessage && <a className={cl.name} href={`/user${ownerId}`}>{firstName}</a>}
						{message}
					</p>
				</button>
			</div>
		</div>

	);
};

Message.propTypes = {
	key: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	ownerId: PropTypes.string.isRequired,
	pic: PropTypes.string.isRequired,
	firstName: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	onContextMenu: PropTypes.func.isRequired,
	highlight: PropTypes.bool.isRequired
}

export default Message;
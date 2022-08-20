import cl from './Comment.module.css';
import PropTypes from "prop-types";

const Comment = ({pic, ownerId, firstName, lastName, message, publishDate, continuous}) => {

	const currentUserId = localStorage.getItem('userId');

	const isCurrentUserComment = ownerId === currentUserId;

	const tail = continuous ? cl.no_tail : "";

	let commentClass = (isCurrentUserComment ? cl.from_me : cl.from_them) + " " + tail;
	const date = new Date(publishDate);
	const stringTime = date.toLocaleTimeString([], {timeStyle: 'short'});

	return (
		<div className={`${cl.comment} ${commentClass}`}>
			{!isCurrentUserComment &&
				<img
					src={pic}
					alt={"comment owner"}
					className={continuous ? cl.hide : ""}
				/>
			}
			<p className={commentClass}>
				<a className={cl.name} href={`/user${ownerId}`}>{firstName + " " + lastName}</a>
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
						</span>
				</span>
			</p>
		</div>
	);
};

Comment.propTypes = {
	pic: PropTypes.string.isRequired,
	ownerId: PropTypes.string.isRequired,
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	publishDate: PropTypes.string.isRequired,
	continuous: PropTypes.bool.isRequired
}

export default Comment;
import React from 'react';
import cl from './Comment.module.css';

const Comment = ({pic, ownerId, firstName, lastName, message}) => {

	/* fixme: DELETE random(). fix on det continious comms */
	const tail = ((Math.random() > 0.5) ? "" : (" " + cl.no_tail));

	const currentUserId = localStorage.getItem('userId');

	/* fixme: delete random */
	const isCurrentUserComment = Math.random() > 0.5 || ownerId === currentUserId;

	let commentClass = isCurrentUserComment ? cl.from_me : cl.from_them;

	return (
		<div className={cl.comment + tail + " " + commentClass}>
			{!isCurrentUserComment && <img src={pic} alt={"comment owner"}/>}
			<p className={commentClass}>
				<span className={cl.name}>{firstName + " " + lastName}</span>
				{message}
			</p>
		</div>
	);
};

export default Comment;
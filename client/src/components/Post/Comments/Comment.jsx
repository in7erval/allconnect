import React, {useState} from 'react';
import cl from './Comment.module.css';

const Comment = ({pic, ownerId, firstName, lastName, message}) => {

	const currentUserId = localStorage.getItem('userId');

	/* fixme: DELETE random(). fix on det continious comms */
	const [tail, setTail] = useState(((Math.random() > 0.5) ? "" : (" " + cl.no_tail)));
	/* fixme: delete random */

	const isCurrentUserComment = ownerId === currentUserId;

	let commentClass = isCurrentUserComment ? cl.from_me : cl.from_them;

	return (
		<div className={cl.comment + tail + " " + commentClass}>
			{!isCurrentUserComment && <img src={pic} alt={"comment owner"}/>}
			<p className={commentClass}>
				<a className={cl.name} href={`/user${ownerId}`}>{firstName + " " + lastName}</a>
				{message}
			</p>
		</div>
	);
};

export default Comment;
import React from 'react';
import Comment from "./Comment.jsx";
import cl from './Comment.module.css';

const Comments = ({comments}) => {
	return (
		<div className={cl.comments}>
			{comments.map(el =>
				<Comment key={el.id}
								 ownerId={el.owner.id}
								 pic={el.owner.picture}
								 firstName={el.owner.firstName}
								 lastName={el.owner.lastName}
								 message={el.message}
				/>)
			}
		</div>
	);
};

export default Comments;
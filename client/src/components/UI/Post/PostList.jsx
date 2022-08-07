import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import cl from "./Post.module.css";

const PostList = ({posts, remove}) => {
	return (
		<TransitionGroup>
			{posts.map(post =>
				<CSSTransition
					key={post._id}
					timeout={500}
					classNames={{
						enter: cl.post_enter,
						enterActive: cl.post_enter_active,
						exitActive: cl.post_exit_active
					}}
				>
					<PostItem remove={remove} number={post._id}
										post={post}/>
				</CSSTransition>
			)}
		</TransitionGroup>
	);

};

export default PostList;
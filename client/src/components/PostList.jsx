import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, remove}) => {
	return (
		<div style={{
			flex: 1
		}}>
			<TransitionGroup>
				{posts.map(post =>
					<CSSTransition
						key={post.id}
						timeout={500}
						classNames="post"
					>
						<PostItem remove={remove} number={post.id}
											post={post}/>
					</CSSTransition>
				)}
			</TransitionGroup>

		</div>
	);

};

export default PostList;
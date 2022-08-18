import React, {useState} from 'react';
import TextareaAutosize from "react-textarea-autosize";
import cl from "./PostForm.module.css";
import PostService from "../../../API/PostService";
import {useNavigate} from "react-router-dom";

const PostForm = () => {

	const [postMsg, setPostMsg] = useState("");
	const userId = localStorage.getItem("userId");
	const navigate = useNavigate();


	const addNewPost = (e) => {
		e.preventDefault();
		console.log("new post!", postMsg);
		PostService.addNewPost(userId, postMsg)
			.then(() => navigate(0));
	};

	return (
		<form onSubmit={addNewPost} className={cl.post_form}>
				<TextareaAutosize
					value={postMsg}
					placeholder="Что Вы хотите сказать?"
					onChange={e => {
						setPostMsg(e.target.value);
					}}
					onKeyPress={(e) => {
						if (e.code === "Enter" && !e.shiftKey) {
							addNewPost(e);
						}
					}}
				/>
			{/*<input type="file"/>*/}
			<button type="submit" >Поделиться</button>
		</form>
	);
};

export default PostForm;
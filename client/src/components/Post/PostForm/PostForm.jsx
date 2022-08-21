import {useState} from 'react';
import TextareaAutosize from "react-textarea-autosize";
import cl from "./PostForm.module.css";
import PostService from "../../../API/PostService";
import {useNavigate} from "react-router-dom";

const PostForm = () => {

	const [postMessage, setPostMessage] = useState("");
	const userId = localStorage.getItem("userId");
	const navigate = useNavigate();
	const [textareaFocused, setTextareaFocused] = useState(false);


	const addNewPost = (event_) => {
		event_.preventDefault();
		console.log("new post!", postMessage);
		PostService.addNewPost(userId, postMessage)
			.then(() => navigate(0));
	};

	return (
		<form onSubmit={addNewPost} className={cl.post_form}>
			<TextareaAutosize
				onFocus={() => setTextareaFocused(true)}
				onBlur={() => setTextareaFocused(false)}
				value={postMessage}
				placeholder="Что Вы хотите сказать?"
				onChange={event_ => {
					setPostMessage(event_.target.value);
				}}
				onKeyPress={(event_) => {
					if (event_.code === "Enter" && !event_.shiftKey) {
						addNewPost(event_);
					}
				}}
			/>
			{/*<input type="file"/>*/}
			{textareaFocused &&
				<button type="submit">Поделиться</button>
			}
		</form>
	);
};

export default PostForm;
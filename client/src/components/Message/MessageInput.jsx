import React, {useState} from 'react';
import storage from "../../utils/storage";
import {USER_KEY} from "../../constants";
import cl from './Message.module.css';
import TextareaAutosize from "react-textarea-autosize";
import arrow from "../../assets/send.svg";

const MessageInput = ({sendMessage}) => {
	const [text, setText] = useState('');
	const user = storage.get(USER_KEY);
	const onSubmit = async (e) => {
		e.preventDefault()
		if (!text.trim()) return

		// извлекаем данные пользователя и формируем начальное сообщение
		const {userId, userName, roomId} = user
		let message = {
			user: userId,
			userName,
			roomId,
		}

		// if (!file) {
		// типом сообщения является текст
		// message.messageType = 'text'
		message.text = text
		// } else {
		// 	// типом сообщения является файл
		// 	try {
		// 		// загружаем файл на сервер и получаем относительный путь к нему
		// 		const path = await fileApi.upload({ file, roomId })
		// 		// получаем тип файла
		// 		const type = file.type.split('/')[0]
		//
		// 		message.messageType = type
		// 		message.textOrPathToFile = path
		// 	} catch (e) {
		// 		console.error(e)
		// 	}
		// }

		// // скрываем компонент с эмодзи, если он открыт
		// if (showEmoji) {
		// 	setShowEmoji(false)
		// }

		// отправляем сообщение
		sendMessage(message);

		// сбрасываем состояние
		setText('');
	}

	return (
		<div>
			{/*<form onSubmit={onSubmit} className='form message'>*/}
			{/*	<EmojiMart setText={setText} messageInput={inputRef.current} />*/}
			{/*<FileInput />*/}
			{/*<Recorder />*/}
			{/*	<input*/}
			{/*		type='text'*/}
			{/*		autoFocus*/}
			{/*		placeholder='Message...'*/}
			{/*		value={text}*/}
			{/*		onChange={(e) => setText(e.target.value)}*/}
			{/*		// ref={inputRef}*/}
			{/*		// при наличии файла вводить текст нельзя*/}
			{/*		// disabled={showPreview}*/}
			{/*	/>*/}
			{/*	<button className='btn' type='submit' disabled={!text.trim()}>*/}
			{/*		Send*/}
			{/*		/!*<FiSend className='icon' />*!/*/}
			{/*	</button>*/}
			{/*</form>*/}

			<form onSubmit={onSubmit} className={cl.message__input}>
				<TextareaAutosize
					autoFocus
					value={text}
					placeholder="Сообщение..."
					onChange={e => {
						setText(e.target.value);
					}}
					onKeyPress={(e) => {
						if (e.code === "Enter" && !e.shiftKey) {
							onSubmit(e);
						}
					}}
				/>
				<button className={cl.message__input_img} type="submit" disabled={!text.trim()}>
					<img src={arrow} alt="send"/>
				</button>
				{/*<input type="file"/>*/}

			</form>
		</div>
	);
};

export default MessageInput;
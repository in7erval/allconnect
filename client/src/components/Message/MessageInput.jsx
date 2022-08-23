import {useState} from 'react';
import cl from './Message.module.css';
import TextareaAutosize from "react-textarea-autosize";
import arrow from "../../assets/send.svg";
import PropTypes from "prop-types";

const MessageInput = ({sendMessage, message}) => {
	const [text, setText] = useState('');
	const onSubmit = async (event_) => {
		event_.preventDefault()
		if (!text.trim()) return

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
		// 	} catch (event_) {
		// 		console.error(event_)
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
					onChange={event_ => {
						setText(event_.target.value);
					}}
					onKeyPress={(event_) => {
						if (event_.code === "Enter" && !event_.shiftKey) {
							onSubmit(event_);
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

MessageInput.propTypes = {
	sendMessage: PropTypes.func.isRequired,
	message: PropTypes.object.isRequired
}

export default MessageInput;
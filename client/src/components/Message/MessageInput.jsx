import {useState} from 'react';
import cl from './Message.module.css';
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from "prop-types";
import convert from "heic2any";
import Compress from "browser-image-compression";
import Loader from "../UI/Loader/Loader";
import fileService from "../../API/FileService";

const MessageInput = ({sendMessage, message}) => {
	const [text, setText] = useState('');
	const [file, setFile] = useState(null);
	const [loadingFile, setLoadingFile] = useState(false);
	const [imagePreviewUrl, setImagePreviewUrl] = useState('');

	const onSubmit = async (event_) => {
		event_.preventDefault()
		if (!text.trim() && !file) return

		// if (!file) {
		// типом сообщения является текст
		// message.messageType = 'text'
		message.text = text
		message.file = file;
		if (file) {
			const {data} = await fileService.upload(message.file, message.roomId);
			console.log("sendMEssage file", data, data.path);
			delete message.file;
			message.picture = data.path;
		}
		setFile(null);
		setImagePreviewUrl('');
		// if (file) {
		// 	const path = await fileService.upload({file, roomId})
		// }
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

	const _handleImageChange = async (event_) => {
		event_.preventDefault();

		let file = event_.target.files[0];
		console.log("file", file);
		const filename = file.name;

		const options = {
			maxSizeMB: 0.5,
			useWebWorker: true
		};

		setLoadingFile(true);

		if (file.type.toLowerCase() === "image/heic" ||
			file.name.toLowerCase().endsWith('.heic')) {
			console.log("HEIC detected");
			file = await convert({
				blob: file,
				toType: 'image/jpeg',
				quality: 1
			});
		}

		await Compress(file, options)
			.then(compressedBlob => {
				compressedBlob.lastModifiedDate = new Date();
				const convertedBlobFile = new File([compressedBlob],
					filename.toLowerCase().replace('.heic', '.jpg'),
					{
						type: file.type,
						lastModified: Date.now()
					});
				console.log(convertedBlobFile);
				setFile(convertedBlobFile);
				setImagePreviewUrl(URL.createObjectURL(compressedBlob));
			})
			.catch(_error => {
				console.log("error while reading", _error);
				// Show the user a toast message or notification that something went wrong while compressing file
			});

		setLoadingFile(false);
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
			<div style={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 10
			}}>
				{loadingFile ? <Loader/> :
					file &&
					<img
						src={imagePreviewUrl}
						style={{maxWidth: '100px', maxHeight: '300px', objectFit: 'cover'}}
						alt="Изображение недоступно"
					/>
				}
			</div>

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

				<label className={cl.message__input_pic}>
					<input
						type="file"
						name="message_image"
						style={{display: 'none'}}
						multiple={false}
						accept=".jpg, .jpeg, .png, .heic"
						onChange={_handleImageChange}
					/>
					<i className="bi bi-image"></i>
				</label>

				<button className={cl.message__input_pic} type="submit">
					<i className="bi bi-arrow-up-circle-fill"></i>
				</button>
			</form>
		</div>
	);
};

MessageInput.propTypes = {
	sendMessage: PropTypes.func.isRequired,
	message: PropTypes.object.isRequired
}

export default MessageInput;
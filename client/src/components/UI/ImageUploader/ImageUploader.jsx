import {useState} from 'react';
import cl from './ImageUploader.module.css';
import UserService from "../../../API/UserService";
import {useNavigate} from "react-router-dom";
import Compress from "browser-image-compression";
import PropTypes from "prop-types";


const ImageUploader = ({currentImg}) => {

		const [file, setFile] = useState('');
		const [imagePreviewUrl, setImagePreviewUrl] = useState(currentImg);
		const userId = localStorage.getItem("userId");
		const navigate = useNavigate();

		const _handleSubmit = (event_) => {
			event_.preventDefault();
			console.log(event_);
			console.log('handle uploading-', file);
			UserService.savePhoto(userId, file);
			navigate(0);
		}

		const _handleImageChange = (event_) => {
			event_.preventDefault();

			let file = event_.target.files[0];
			console.log("file", file);

			const options = {
				maxSizeMB: 0.5,
				useWebWorker: true
			}

			Compress(file, options)
				.then(compressedBlob => {
					console.log(compressedBlob)
					compressedBlob.lastModifiedDate = new Date()
					const convertedBlobFile = new File([compressedBlob], file.name, {type: file.type, lastModified: Date.now()});
					setFile(convertedBlobFile);
					setImagePreviewUrl(URL.createObjectURL(compressedBlob));
				})
				.catch(_error => {
					// Show the user a toast message or notification that something went wrong while compressing file
				});

		}

		return (
			<div className={cl.image_uploader}>
				<div className={cl.preview}>
					<img src={imagePreviewUrl} alt="pic"/>
				</div>
				<form onSubmit={_handleSubmit}>

					{/*<FileBase64 type="file"*/}
					{/*						multiple={false}*/}
					{/*						onDone={({base64}) => {*/}
					{/*							console.log("base64", base64);*/}
					{/*							// setPhoto({image: base64});*/}
					{/*						}}/>*/}
					<input
						className={cl.file_input}
						type="file"
						name="image"
						onChange={_handleImageChange}
					/>
					<button className={cl.submit} type="submit">
						Загрузить
					</button>
				</form>
			</div>
		);
	}
;

ImageUploader.propTypes = {
	currentImg: PropTypes.string.isRequired
}

export default ImageUploader;
import {useState} from 'react';
import cl from './ImageUploader.module.css';
import UserService from "../../../API/UserService";
import {useNavigate} from "react-router-dom";
import Compress from "browser-image-compression";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";


const ImageUploader = ({currentImg}) => {

		const [file, setFile] = useState('');
		const [imagePreviewUrl, setImagePreviewUrl] = useState(currentImg);
		const [loading, setLoading] = useState(false);
		const userId = localStorage.getItem("userId");
		const navigate = useNavigate();

		const _handleSubmit = async (event_) => {
			event_.preventDefault();
			console.log(event_);
			console.log('handle uploading-', file);
			await UserService.savePhoto(userId, file);
			navigate(0);
		}

		const _handleImageChange = async (event_) => {
			event_.preventDefault();

			let file = event_.target.files[0];
			console.log("file", file);

			const options = {
				maxSizeMB: 0.5,
				useWebWorker: true
			};

			setLoading(true);

			await Compress(file, options)
				.then(compressedBlob => {
					console.log(compressedBlob);
					compressedBlob.lastModifiedDate = new Date();
					const convertedBlobFile = new File([compressedBlob], file.name, {type: file.type, lastModified: Date.now()});
					setFile(convertedBlobFile);
					setImagePreviewUrl(URL.createObjectURL(compressedBlob));
				})
				.catch(_error => {
					// Show the user a toast message or notification that something went wrong while compressing file
				});

			setLoading(false);
		}

		return (
			<div className={cl.image_uploader}>
				<div className={cl.preview}>
					{loading ? <Loader/> : <img src={imagePreviewUrl} alt="pic"/>}
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
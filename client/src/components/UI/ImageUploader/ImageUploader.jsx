import React, {useState} from 'react';
import cl from './ImageUploader.module.css';
import UserService from "../../../API/UserService";
import {useNavigate} from "react-router-dom";


const ImageUploader = ({currentImg}) => {

		const [file, setFile] = useState('');
		const [imagePreviewUrl, setImagePreviewUrl] = useState(currentImg);
		const userId = localStorage.getItem("userId");
		const navigate = useNavigate();

		const _handleSubmit = (e) => {
			e.preventDefault();
			console.log(e);
			console.log('handle uploading-', file);
			UserService.savePhoto(userId, file);
			navigate(0);
		}

		const _handleImageChange = (e) => {
			e.preventDefault();

			console.log("imageChange!");

			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				setFile(file);
				setImagePreviewUrl(reader.result);
			}

			reader.readAsDataURL(file);

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
					<input className={cl.file_input}
								 type="file"
								 name="image"
								 onChange={_handleImageChange}/>
					<button className={cl.submit}
									type="submit">Upload Image
					</button>
				</form>
			</div>
		);
	}
;

export default ImageUploader;
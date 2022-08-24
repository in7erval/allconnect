import {useState} from 'react';
import showPass from '../../assets/pass_show.png';
import passVisible from '../../assets/pass_visible.png';
import cl from './Login.module.css';
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import {registerWithEmailAndPassword} from "../../firebase/index";
import {parseError} from "../../store/errorReducer";
import {USER_ID} from "../../constants";
import {useNavigate} from "react-router-dom";

const RegistrationForm = ({returnToHome}) => {

	const dispatch = useDispatch();

	const [email, setEmail] = useState();
	const [name, setName] = useState();
	const [surname, setSurname] = useState();
	const [password, setPassword] = useState();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate();

	const sendData = (event_) => {
		event_.preventDefault();
		console.log('register', email, name, surname);
		registerWithEmailAndPassword(name, surname, email, password)
			.then(response => {
				console.log("registerResp", response);
				if (response != null && response.body != null && response.body._id !== null) {
					localStorage.setItem(USER_ID, response.body._id);
					navigate('/posts', {replace: true});
				} else {
					dispatch(parseError(response.error));
				}
			})
			.catch(error => dispatch(parseError(error)));
	}

	return (
		<div className={cl.login_page__registration + " w-400 justify-content-start"}>
			<div className={cl.login_page__login_title}>
				<h3>Регистрация в allconnect</h3>
			</div>
			<form className={cl.login_form} onSubmit={sendData}>
				<div className={cl.login_form__input_group}>
					<label htmlFor="firstname">Имя</label>
					<input
						id="firstname"
						type="text"
						autoFocus={true}
						required

						onChange={event_ => setName(event_.target.value)}
					/>
				</div>
				<div className={cl.login_form__input_group}>
					<label htmlFor="lastname">Фамилия</label>
					<input
						id="lastname"
						type="text"
						autoFocus={true}
						required
						onChange={event_ => setSurname(event_.target.value)}
					/>
				</div>
				<div className={cl.login_form__input_group}>
					<label htmlFor="username">Email</label>
					<input
						id="username"
						type="email"
						autoFocus={true}
						required
						onChange={event_ => setEmail(event_.target.value)}
					/>
				</div>
				<div className={cl.login_form__input_group}>
					<div className={cl.login_form__password_and_img}>
						<label htmlFor="new-password">Пароль</label>
						<img
							src={passwordVisible ? passVisible : showPass}
							alt="showpass"
							onClick={() => setPasswordVisible(!passwordVisible)}
						/>
					</div>
					<input
						id="new-password"
						required
						type={passwordVisible ? "text" : "password"}
						onChange={event_ => setPassword(event_.target.value)}
						className={passwordVisible ? "" : "ls-5"}
					/>
				</div>

				<button
					type="submit"
					className={cl.login_page__login_button + " " + cl.btn_register_color}
				>
					Зарегистрироваться
				</button>
			</form>
			<button
				className={cl.btn_return}
				onClick={returnToHome}
			>
				<i className="bi bi-caret-left"></i>
			</button>
		</div>
	);
};

RegistrationForm.propTypes = {
	returnToHome: PropTypes.func.isRequired
}

export default RegistrationForm;
import {useState} from 'react';
import showPass from '../../assets/pass_show.png';
import passVisible from '../../assets/pass_visible.png';
import cl from './Login.module.css';
import {parseError} from "../../store/errorReducer";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {signInWithEmailPassword} from "../../firebase/index";
import {USER_ID} from "../../constants";
import {useNavigate} from "react-router-dom";

const LoginForm = ({returnToHome}) => {

	const dispatch = useDispatch();

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate();

	const sendData = async (event_) => {
		event_.preventDefault();
		console.log('submit', email);
		await signInWithEmailPassword(email, password)
			.then(response => {
				if (response.error) {
					dispatch(parseError(response.error));
				} else {
					console.log("set USER_ID", response.user.user);
					localStorage.setItem(USER_ID, response.user.user);
					navigate('/posts', {replace: true});
				}
			})
			.catch(error => dispatch(parseError(error)));
	}

	return (
		<div className={cl.login_page__login + " w-400 justify-content-start"}>
			<form className={cl.login_form} onSubmit={sendData}>
				<div className={cl.login_form__input_group}>
					<label htmlFor="email">email</label>
					<input
						id="email"
						type="email"
						autoFocus={true}
						required={true}
						autoComplete="email"
						onChange={event_ => setEmail(event_.target.value)}
					/>
				</div>
				<div className={cl.login_form__input_group}>
					<div className={cl.login_form__password_and_img}>
						<label htmlFor="current-password">Пароль</label>
						<img
							src={passwordVisible ? passVisible : showPass}
							alt="showpass"
							onClick={() => setPasswordVisible(!passwordVisible)}
						/>
					</div>
					<input
						id="current-password"
						required={true}
						type={passwordVisible ? "text" : "password"}
						onChange={event_ => setPassword(event_.target.value)}
						className={passwordVisible ? "" : "ls-5"}
					/>
				</div>
				<button
					type="submit"
					className={cl.login_page__login_button}
					disabled={!password || !email}
					title={"Введите" + (!email ? " email" : "") + (!email && !password ? " и" : "") + (!password ? " пароль" : "")}
				>
					Войти
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

LoginForm.propTypes = {
	returnToHome: PropTypes.func.isRequired
}

export default LoginForm;
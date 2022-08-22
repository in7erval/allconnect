import {useContext, useState} from 'react';
import showPass from '../../assets/pass_show.png';
import passVisible from '../../assets/pass_visible.png';
import cl from './Login.module.css';
import UserAuthService from "../../API/UserAuthService";
import {parseError} from "../../store/errorReducer";
import {AuthContext} from "../../context";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setId} from "../../store/authReducer";
import PropTypes from "prop-types";

const LoginForm = ({returnToHome}) => {

	const dispatch = useDispatch();

	const [login, setLogin] = useState();
	const [password, setPassword] = useState();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const {_isAuth, setIsAuth} = useContext(AuthContext);
	const navigate = useNavigate();

	const sendData = (event_) => {
		event_.preventDefault();
		console.log('submit', login);
		UserAuthService.checkLoginPassword(login, password)
			.then(response => response.body)
			.then(body => {
				if (body._id !== null) {
					setIsAuth(true);
					localStorage.setItem('auth', 'true');
					localStorage.setItem('userId', body.user);
					dispatch(setId(body.user))
					navigate('/posts');
				} else {
					dispatch(parseError(body.error));
				}
			});
	}

	return (
		<div className={cl.login_page__login + " w-400 justify-content-start"}>
			<form className={cl.login_form} onSubmit={sendData}>
				<div className={cl.login_form__input_group}>
					<label htmlFor="username">Логин</label>
					<input
						id="username"
						type="text"
						autoFocus={true}
						required={true}
						autoComplete="username"
						onChange={event_ => setLogin(event_.target.value)}
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
					disabled={!password || !login}
					title={"Введите" + (!login ? " логин" : "") + (!login && !password ? " и" : "") + (!password ? " пароль" : "")}
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
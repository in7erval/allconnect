import React, {useState, useContext} from 'react';
import showPass from '../../assets/pass_show.png';
import passVisible from '../../assets/pass_visible.png';
import cl from './Login.module.css';
import UserAuthService from "../../API/UserAuthService";
import {parseError} from "../../store/errorReducer";
import {AuthContext} from "../../context";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setId} from "../../store/authReducer";

const RegistrationForm = ({returnToHome}) => {

	const dispatch = useDispatch();

	const [login, setLogin] = useState();
	const [name, setName] = useState();
	const [surname, setSurname] = useState();
	const [password, setPassword] = useState();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const {isAuth, setIsAuth} = useContext(AuthContext);
	const navigate = useNavigate();

	const sendData = (e) => {
		e.preventDefault();
		console.log('register', login);
		UserAuthService.registerUser(
			{
				login,
				loginPass: btoa(`${login}:${password}`),
				firstName: name, lastName: surname
			}
		).then(res => {
			console.log("registerResp", res);
			if (res != null && res.body != null && res.body._id !== null) {
				setIsAuth(true);
				localStorage.setItem('auth', 'true');
				localStorage.setItem('userId', res.body._id);
				dispatch(setId(res.body._id));
				navigate('/posts', { replace: true });
			} else {
				dispatch(parseError(res.error));
			}
		})
			.catch(err => dispatch(parseError(err)));
	}

	return (
		<div className={cl.login_page__registration + " w-400 justify-content-start"}>
			<div className={cl.login_page__login_title}>
				Вход allconnect
			</div>
			<form className={cl.login_form} onSubmit={sendData}>
				<div className={cl.login_form__input_group}>
					<label>Имя</label>
					<input type="text" autoFocus={true} onChange={e => setName(e.target.value)}/>
				</div>
				<div className={cl.login_form__input_group}>
					<label>Фамилия</label>
					<input type="text" autoFocus={true} onChange={e => setSurname(e.target.value)}/>
				</div>
				<div className={cl.login_form__input_group}>
					<label>Логин</label>
					<input type="text" autoFocus={true} onChange={e => setLogin(e.target.value)}/>
				</div>
				<div className={cl.login_form__input_group}>
					<div className={cl.login_form__password_and_img}>
						<label>Пароль</label>
						<img src={passwordVisible ? passVisible : showPass}
								 alt="showpass"
								 onClick={() => setPasswordVisible(!passwordVisible)}/>
					</div>
					<input type={passwordVisible ? "text" : "password"}
								 onChange={e => setPassword(e.target.value)}
								 className={passwordVisible ? "" : "ls-5"}/>
				</div>

				<button type="submit"
								className={cl.login_page__login_button + " " + cl.btn_register_color}>
					Зарегистрироваться
				</button>
			</form>
			<button className={cl.login_page__login_button}
							onClick={returnToHome}>
				Назад
			</button>
		</div>
	);
};

export default RegistrationForm;
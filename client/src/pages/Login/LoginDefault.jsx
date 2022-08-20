import cl from './Login.module.css';
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";

const LoginDefault = ({setIsLoginOpen, setIsRegistrationOpen}) => {
	return (
		<div className={cl.login_page__login + " w-400"}>
			{/** fixme: LOGO */}
			<img src={logo} className={cl.logo} alt="logo"/>
			{/*<div className={cl.logo}>A</div>*/}
			<div className={cl.login_page__login_title}>
				Вход allconnect
			</div>
			<div className={cl.login_page__login_button_group}>
				<button
					className={cl.login_page__login_button + " mb-20"}
					onClick={() => setIsLoginOpen(true)}>
					Войти
				</button>
				<button className={cl.login_page__login_button + " " + cl.btn_register_color}
				onClick={() => setIsRegistrationOpen(true)}>
					Зарегистрироваться
				</button>
			</div>
			<div className={cl.login_page__login_info}>
				После регистрации вы получите доступ ко всем возможностям A ID
				<br/>
				<a href="#">Узнать больше</a>
			</div>
		</div>
	);
};

LoginDefault.propTypes = {
	setIsLoginOpen: PropTypes.func.isRequired,
	setIsRegistrationOpen: PropTypes.func.isRequired
}

export default LoginDefault;
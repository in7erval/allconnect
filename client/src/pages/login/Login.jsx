import React, {useState} from 'react';
import mock from '../../assets/mock-iphone.png';
import LoginDefault from "./LoginDefault";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import cl from "./Login.module.css";

const Login = () => {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

	const returnToHome = () => {
		setIsLoginOpen(false);
		setIsRegistrationOpen(false);
	};

	return (
		<div
			className={cl.login_page}>
			<div className={cl.login_page__info}>
				<p className={cl.p_first}>Для мобильных устройств</p>
				<p className={cl.p_second}>
					Веб-приложение allconnect оптимизировано для работы на мобильных устройствах.
					<br/>
					Будьте на связи и оставайтесь в курсе новостей ваших друзей, где бы вы ни находились.
				</p>

				<div className={cl.login_page__mock_imgs}>
					<img
						src={mock}
						width="400px"
						className={cl.img_mock}
						alt={"mock"}
					/>
					<img
						src={mock}
						width="400px"
						className={cl.img_mock}
						alt={"mock"}
					/>
				</div>
			</div>
			{!isLoginOpen && !isRegistrationOpen &&
				<LoginDefault setIsLoginOpen={setIsLoginOpen}
											setIsRegistrationOpen={setIsRegistrationOpen}/>}
			{isLoginOpen ?
				<LoginForm returnToHome={returnToHome}/>
				: isRegistrationOpen ? <RegistrationForm returnToHome={returnToHome}/> : null}
		</div>
	);
};

export default Login;
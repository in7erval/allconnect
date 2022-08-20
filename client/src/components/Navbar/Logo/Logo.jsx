import cl from "./Logo.module.css";
import logo from "../../../assets/logo.png";

const Logo = () => {
	return (
		<div className={cl.logo_all}>
			<img src={logo} alt="logo" className={cl.logo_img}/>
			<p className={cl.logo_text}>
				allconnect
			</p>
		</div>
	);
};

export default Logo;
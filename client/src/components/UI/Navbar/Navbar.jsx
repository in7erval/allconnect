import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import Logo from "./Logo/Logo";
import SearchNav from "./SearchNav/SearchNav";
import cl from "./Navbar.module.css";

const Navbar = () => {

	const {isAuth, setIsAuth} = useContext(AuthContext);

	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem('auth');
	}

	return (
		<div className="navbar">
			<Link to="/"><Logo /></Link>
			<SearchNav />
			<div className="navbar__links">
				<div className={cl.navbar_link} onClick={logout}>Выйти</div>
			</div>
		</div>
	);
};

export default Navbar;
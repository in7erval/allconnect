import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context";
import Logo from "./Logo/Logo";
import SearchNav from "./SearchNav/SearchNav";
import cl from "./Navbar.module.css";
import LinksNav from "./LinksNav/LinksNav";
import AsideNav from "../../AsideNav/AsideNav";
import MyModal from "../MyModal/MyModal";

const Navbar = () => {

	const {isAuth, setIsAuth} = useContext(AuthContext);
	const [showMenu, setShowMenu] = useState(false);

	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem('auth');
	}

	return (
		<nav className={cl.navbar}>
			<div className={cl.navbar__content}>
				<Link to="/"><Logo/></Link>
				<SearchNav/>

				<div className={cl.show_menu}
						 onClick={() => setShowMenu(!showMenu)}>
					Меню
				</div>

				<div className={cl.navbar__links}>
					<div className={cl.navbar_link} onClick={logout}>Выйти</div>
				</div>

				<MyModal visible={showMenu} setVisible={setShowMenu}
								 children={<AsideNav isAbsolute={true}/>}
				/>

			</div>
		</nav>
	);
};

export default Navbar;
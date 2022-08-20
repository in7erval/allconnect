import {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context";
import Logo from "./Logo/Logo";
import SearchNav from "./SearchNav/SearchNav";
import cl from "./Navbar.module.css";
import AsideNav from "../AsideNav/AsideNav";
import MyModal from "../UI/MyModal/MyModal";

const Navbar = () => {

	const {_isAuth, setIsAuth} = useContext(AuthContext);
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

				<div
					className={cl.show_menu}
					onClick={() => setShowMenu(!showMenu)}
				>
					Меню
				</div>

				<div className={cl.navbar__links}>
					<a className={cl.navbar_link} onClick={logout}>
						<i className="bi bi-box-arrow-right"></i>
					</a>
				</div>

				<MyModal
					visible={showMenu} setVisible={setShowMenu}
				>
					<AsideNav isAbsolute={true}/>
				</MyModal>

			</div>
		</nav>
	);
};

export default Navbar;
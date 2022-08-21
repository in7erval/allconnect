import {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context";
import Logo from "./Logo/Logo";
import SearchNav from "./SearchNav/SearchNav";
import cl from "./Navbar.module.css";
import Nav from "../Nav";

const Navbar = () => {

	const {isAuth, setIsAuth} = useContext(AuthContext);

	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem('auth');
	}

	return (
		<nav className={cl.navbar}>
			<div className={cl.navbar__content}>
				<Link to="/"><Logo/></Link>
				<SearchNav/>

				{isAuth &&
					<div className={cl.show_menu}>
						<Nav/>
					</div>
				}


				<div className={cl.navbar__links}>
					<a className={cl.navbar_link} onClick={logout}>
						<i className="bi bi-box-arrow-right" style={{fontSize: "1.25rem"}}></i>
					</a>
				</div>


			</div>
		</nav>
	);
};

export default Navbar;
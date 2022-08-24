import {Link} from "react-router-dom";
import Logo from "./Logo/Logo";
import SearchNav from "./SearchNav/SearchNav";
import cl from "./Navbar.module.css";
import Nav from "../Nav";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";
import {signOut} from "firebase/auth";
import {useDispatch} from "react-redux";
import {parseError} from "../../store/errorReducer";

const Navbar = () => {

	// const {isAuth, setIsAuth} = useContext(AuthContext);

	const [user, _loading, _error] = useAuthState(auth);
	const dispatch = useDispatch();

	const logout = () => {
		signOut(auth).then(() => {
			console.log("logout");
		}).catch(error => dispatch(parseError(error)));
	}

	return (
		<nav className={cl.navbar}>
			<div className={cl.navbar__content}>
				<Link to="/"><Logo/></Link>
				<SearchNav/>

				{user &&
					<div className={cl.show_menu}>
						<Nav activeClassName={cl.active}/>
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
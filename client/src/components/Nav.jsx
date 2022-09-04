import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Nav = ({activeClassName}) => {

	const {store} = useContext(Context);
	const userId = store.userId;

	return (
		<ul>
			<li>
				<NavLink to="/posts" className={({isActive}) => isActive ? activeClassName : ""}>
					<i className="bi bi-newspaper"></i>
					<div>Новости</div>
				</NavLink>
			</li>
			<li>
				<NavLink to={`/user${userId}`} className={({isActive}) => isActive ? activeClassName : ""}>
					<i className="bi bi-person"></i>
					<div>Моя страница</div>
				</NavLink>
			</li>
			{/*<a href="/posts"><li><div>Новости</div></li></a>*/}
			<li>
				<NavLink to="/friends" className={({isActive}) => isActive ? activeClassName : ""}>
					<i className="bi bi-people"></i>
					<div>Друзья</div>
				</NavLink>
			</li>
			<li>
				<NavLink to="/messages" className={({isActive}) => isActive ? activeClassName : ""}>
					<i className="bi bi-chat-text"></i>
					<div>Сообщения</div>
					<p>{store.countUnreadMessages > 0 ? store.countUnreadMessages : ""}</p>
				</NavLink>
			</li>
		</ul>
	);
};

Nav.propTypes = {
	activeClassName: PropTypes.string.isRequired
}

export default observer(Nav);
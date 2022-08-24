import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {USER_ID} from "../constants";


const Nav = ({activeClassName}) => {

	const userId = localStorage.getItem(USER_ID);

	const link = window.location.pathname;
	console.log("link", link);

	const navMap = new Map([
		["posts", {paths: [/^\/$/, /^\/posts$/]}],
		["page", {paths: [new RegExp(`^/user${userId}$`)]}],
		["friends", {paths: [/^\/friends$/]}],
		["messages", {paths: [/^\/messages/]}]
	]);

	const isActive = (name) => {
		return navMap.get(name).paths.some(element => element.test(link));
	}

	return (
		<ul>
			<Link to="/posts">
				<li className={isActive("posts") ? activeClassName : ""}>
					<i className="bi bi-newspaper"></i>
					<div>Новости</div>
				</li>
			</Link>
			<Link to={`/user${userId}`}>
				<li className={isActive("page") ? activeClassName : ""}>
					<i className="bi bi-person"></i>
					<div>Моя страница</div>
				</li>
			</Link>
			{/*<a href="/posts"><li><div>Новости</div></li></a>*/}
			<Link to="/friends">
				<li className={isActive("friends") ? activeClassName : ""}>
					<i className="bi bi-people"></i>
					<div>Друзья</div>
				</li>
			</Link>
			<Link to="/messages">
				<li className={isActive("messages") ? activeClassName : ""}>
					<i className="bi bi-chat-text"></i>
					<div>Сообщения</div>
				</li>
			</Link>
		</ul>
	);
};

Nav.propTypes = {
	activeClassName: PropTypes.string.isRequired
}

export default Nav;
import PropTypes from "prop-types";


const Nav = ({activeClassName}) => {

	const userId = localStorage.getItem('userId');

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
			<a href="/">
				<li className={isActive("posts") ? activeClassName : ""}>
					<i className="bi bi-newspaper"></i>
					<div>Новости</div>
				</li>
			</a>
			<a href={`/user${userId}`}>
				<li className={isActive("page") ? activeClassName : ""}>
					<i className="bi bi-person"></i>
					<div>Моя страница</div>
				</li>
			</a>
			{/*<a href="/posts"><li><div>Новости</div></li></a>*/}
			<a href="/friends">
				<li className={isActive("friends") ? activeClassName : ""}>
					<i className="bi bi-people"></i>
					<div>Друзья</div>
				</li>
			</a>
			<a href="/messages">
				<li className={isActive("messages") ? activeClassName : ""}>
					<i className="bi bi-chat-text"></i>
					<div>Сообщения</div>
				</li>
			</a>
		</ul>
	);
};

Nav.propTypes = {
	activeClassName: PropTypes.string.isRequired
}

export default Nav;
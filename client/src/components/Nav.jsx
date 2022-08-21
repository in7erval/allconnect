const Nav = () => {

	const userId = localStorage.getItem('userId');

	return (
		<ul>
			<a href="/">
				<li>
					<i className="bi bi-house"></i>
					<div>Главная</div>
				</li>
			</a>
			<a href={`/user${userId}`}>
				<li>
					<i className="bi bi-person"></i>
					<div>Моя страница</div>
				</li>
			</a>
			{/*<a href="/posts"><li><div>Новости</div></li></a>*/}
			<a href="/friends">
				<li>
					<i className="bi bi-people"></i>
					<div>Друзья</div>
				</li>
			</a>
			<a href="/messages">
				<li>
					<i className="bi bi-chat-text"></i>
					<div>Сообщения</div>
				</li>
			</a>
		</ul>
	);
};

export default Nav;
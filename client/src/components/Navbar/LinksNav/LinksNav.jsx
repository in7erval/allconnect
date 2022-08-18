import React from 'react';
import cl from "./LinksNav.module.css";

const LinksNav = () => {

	const userId = localStorage.getItem('userId');

	return (
		// <nav>
		// 	<ul>
		// 		<li>
		// 			<div>Меню</div>
		// 			<ul>
		// 				<a href="/">
		// 					<li>
		// 						<div>Главная</div>
		// 					</li>
		// 				</a>
		// 				<a href={`/user${userId}`}>
		// 					<li>
		// 						<div>Моя страница</div>
		// 					</li>
		// 				</a>
		// 				{/*<a href="/posts"><li><div>Новости</div></li></a>*/}
		// 				<a href="#">
		// 					<li>
		// 						<div>Ещё что-нибудь</div>
		// 					</li>
		// 				</a>
		// 				<a href="#">
		// 					<li>
		// 						<div>Сообщения</div>
		// 					</li>
		// 				</a>
		// 			</ul>
		// 		</li>
		// 	</ul>
		//
		// </nav>
		<nav className={cl.nav}>
			<input type="checkbox" className={cl.checkbox} id="checkbox"/>
			<label htmlFor="checkbox">
				Меню
				{/*<i className="fa fa-bars menu-icon"></i>*/}
			</label>
			<nav>
				<ul>
					<li><a href="#">Home</a></li>
					<li><a href="#">About</a></li>
					<li><a href="#">Services</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
			</nav>

		</nav>
	);
};

export default LinksNav;
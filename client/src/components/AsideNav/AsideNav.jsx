import React from 'react';
import cl from './AsideNav.module.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const AsideNav = () => {

	const userId = localStorage.getItem('userId');

	return (
		<aside className={cl.aside_nav}>
			<ul>
				<a href="/"><li><div>Главная</div></li></a>
				<a href={`/user${userId}`}><li><div>Моя страница</div></li></a>
				<a href="/posts"><li><div>Новости</div></li></a>
				<a href="#"><li><div>Ещё что-нибудь</div></li></a>
				<a href="#"><li><div>Сообщения</div></li></a>
			</ul>
		</aside>
	);
};

export default AsideNav;
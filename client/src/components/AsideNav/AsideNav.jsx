import cl from './AsideNav.module.css';
import PropTypes from "prop-types";

const AsideNav = ({isAbsolute}) => {

	const userId = localStorage.getItem('userId');

	isAbsolute = isAbsolute === undefined || isAbsolute === null ? false : isAbsolute;

	return (
		<aside className={`${cl.aside_nav} ${isAbsolute ? cl.aside_nav_ignore : ""}`}>
			<div className={cl.aside_nav__content}>
				<ul>
					<a href="/">
						<li>
							<div>Главная</div>
						</li>
					</a>
					<a href={`/user${userId}`}>
						<li>
							<div>Моя страница</div>
						</li>
					</a>
					{/*<a href="/posts"><li><div>Новости</div></li></a>*/}
					<a href="#">
						<li>
							<div>Ещё что-нибудь</div>
						</li>
					</a>
					<a href="/messages">
						<li>
							<div>Сообщения</div>
						</li>
					</a>
				</ul>
			</div>
		</aside>
	);
};

AsideNav.propTypes = {
	isAbsolute: PropTypes.bool.isRequired
}

export default AsideNav;
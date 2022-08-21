import cl from './AsideNav.module.css';
import Nav from "../Nav";

const AsideNav = () => {
	return (
		<aside className={cl.aside_nav}>
			<div className={cl.aside_nav__content}>
				<Nav/>
			</div>
		</aside>
	);
};

export default AsideNav;
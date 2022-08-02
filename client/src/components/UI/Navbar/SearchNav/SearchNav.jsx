import React from 'react';
import cl from "./SearchNav.module.css";

const SearchNav = () => {
	return (
		<div className={cl.search}>
			<input type="text" className={cl.search_input} placeholder="Поиск..."/>
		</div>
	);
};

export default SearchNav;
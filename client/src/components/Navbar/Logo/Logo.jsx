import React from 'react';
import cl from "./Logo.module.css";

const Logo = () => {
	return (
		<div className={cl.logo_all}>
			<p className={cl.logo_img}>
				A
			</p>
			<p className={cl.logo_text}>
				allconnect
			</p>
		</div>
	);
};

export default Logo;
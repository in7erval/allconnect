import React from 'react';
import cl from "./MessageContextMenu.module.css";

const MessageContextMenu = ({isActive, reference, liMap}) => {
	return (
		<nav className={`${cl.message_content_menu} ${isActive ? cl.message_content_menu_active : "" }`} ref={reference}>
			<ul>
				{liMap?.map((el, i) =>
					<li key={i}><button className={el.isDanger ? cl.danger : ""} onClick={el.onClick}>{el.text}</button></li>
				)}
				{/*<li><button className={cl.danger}>Удалить у меня</button></li>*/}
				{/*<li><button className={cl.danger}>Удалить у всех</button></li>*/}
				{/*<li><button onClick={close}>Закрыть</button></li>*/}
			</ul>
		</nav>
	);
};

export default MessageContextMenu;
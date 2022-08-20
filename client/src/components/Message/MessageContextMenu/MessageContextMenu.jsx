import cl from "./MessageContextMenu.module.css";
import PropTypes from "prop-types";

const MessageContextMenu = ({isActive, reference, liMap}) => {
	return (
		<nav className={`${cl.message_content_menu} ${isActive ? cl.message_content_menu_active : "" }`} ref={reference}>
			<ul>
				{liMap?.map((element, index) =>
					<li key={index}><button className={element.isDanger ? cl.danger : ""} onClick={element.onClick}>{element.text}</button></li>
				)}
				{/*<li><button className={cl.danger}>Удалить у меня</button></li>*/}
				{/*<li><button className={cl.danger}>Удалить у всех</button></li>*/}
				{/*<li><button onClick={close}>Закрыть</button></li>*/}
			</ul>
		</nav>
	);
};

MessageContextMenu.propTypes = {
	isActive: PropTypes.bool.isRequired,
	reference: PropTypes.object.isRequired,
	liMap: PropTypes.array.isRequired
}

export default MessageContextMenu;
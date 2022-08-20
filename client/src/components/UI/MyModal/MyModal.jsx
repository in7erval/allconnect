import cl from './MyModal.module.css';
import PropTypes from "prop-types";

const MyModal = ({children, visible, setVisible}) => {

	const rootClasses = [cl.myModal];

	if (visible) {
		rootClasses.push(cl.active);
	}

	return (
		<div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
			<div
				className={cl.myModalContent}
				onClick={(event_) => event_.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

MyModal.propTypes = {
	children: PropTypes.element.isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired
}

export default MyModal;
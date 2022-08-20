import cl from "./Popup.module.css";
import {useDispatch} from "react-redux";
import {deleteError} from "../../../store/errorReducer";
import PropTypes from "prop-types";

const Popup = ({errors}) => {

	const dispatch = useDispatch();
	console.log("error in popup", errors);

	const deleteError_ = (key) => {
		console.log(key);
		dispatch(deleteError(key));
	}

	return errors && (
		<div className={cl.popups}>
			{errors.map((element, index) =>
				(
					<div key={index} className={cl.popup} onClick={_event => deleteError_(index)}>
					<p className={cl.helper}>X</p>
						{element.msg ? (<p>{element.msg}</p>) : (<p>{element}</p>)}
				</div>
				)
			)}

		</div>

	);
};

Popup.propTypes = {
	errors: PropTypes.array.isRequired
}

export default Popup;
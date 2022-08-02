import React from 'react';
import cl from "./Popup.module.css";
import {useDispatch} from "react-redux";
import {deleteError} from "../../../store/errorReducer";

const Popup = ({errors}) => {

	const dispatch = useDispatch();
	console.log("error in popup", errors);

	const deleteErr = (e, key) => {
		console.log(key);
		dispatch(deleteError(key));
	}

	return errors ? (
		<div className={cl.popups}>
			{errors.map((el, ind) =>
				(
					<div key={ind} className={cl.popup} onClick={event => deleteErr(event, ind)}>
					<p className={cl.helper}>X</p>
					<p>{el.msg}</p>
				</div>
				)
			)}

		</div>

	) : null;
};

export default Popup;
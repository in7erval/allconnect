import AsideNav from "./AsideNav/AsideNav";
import PropTypes from "prop-types";
import useUser from "../hooks/useUser";
import {USER_ID} from "../constants";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUsers} from "../store/usersOnlineReducer";

const DefaultPage = ({children}) => {

	const loggedUserId = localStorage.getItem(USER_ID);
	const dispatch = useDispatch();

	const {users} = useUser(loggedUserId);
	console.log("USERS", users);

	useEffect(() => {
		dispatch(setUsers(users));
	}, [users]);

	return (
		<div className="default_page">
			<AsideNav/>
			<div className="default_page__content">
				{children}
			</div>
		</div>
	);
};

DefaultPage.propTypes = {
	children: PropTypes.element
}

export default DefaultPage;
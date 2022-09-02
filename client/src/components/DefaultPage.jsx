import AsideNav from "./AsideNav/AsideNav";
import PropTypes from "prop-types";
import useUser from "../hooks/useUser";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const DefaultPage = ({children}) => {

	const {store} = useContext(Context);
	const loggedUserId = store.userId;
	console.log("LOGGED USERID", loggedUserId);

	const {users} = useUser(loggedUserId);
	console.log("USERS", users);
	useEffect(() => {
		store.setOnlineUsers(users);
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

export default observer(DefaultPage);
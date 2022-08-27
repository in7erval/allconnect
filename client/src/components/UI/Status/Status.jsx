import {getOfflineInfo, isUserOnline} from "../../../utils/users";
import cl from "./Status.module.css";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const Status = ({userId, disableHover}) => {

	if (disableHover) {
		console.log("Hover disabled");
	}

	const onlineUsers = useSelector(state => state.usersOnlineReducer.users);

	const disableHoverClassName = disableHover ? (" " + cl.no_hover) : "";

	console.log("onlineUsers", onlineUsers);

	return (isUserOnline(onlineUsers, userId) ?
			(<div className={cl.status + " " + cl.online + disableHoverClassName}>
				<p>онлайн</p>
			</div>)
			:
			(<div className={cl.status + " " + cl.offline + disableHoverClassName}>
				<p>был <b>{getOfflineInfo(onlineUsers, userId).lastConnection}</b></p>
			</div>)
	);
};

Status.propTypes = {
	userId: PropTypes.string.isRequired,
	disableHover: PropTypes.bool
}

export default Status;
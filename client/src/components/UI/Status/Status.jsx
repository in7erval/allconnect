import {getOfflineInfo, isUserOnline} from "../../../utils/users";
import cl from "./Status.module.css";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const Status = ({userId}) => {

	const onlineUsers = useSelector(state => state.usersOnlineReducer.users);

	return (isUserOnline(onlineUsers, userId) ?
			(<div className={cl.status + " " + cl.online}>
				<p>онлайн</p>
			</div>)
			:
			(<div className={cl.status + " " + cl.offline}>
				<p>был <b>{getOfflineInfo(onlineUsers, userId).lastConnection}</b></p>
			</div>)
	);
};

Status.propTypes = {
	userId: PropTypes.string.isRequired
}

export default Status;
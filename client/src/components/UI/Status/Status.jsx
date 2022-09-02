import cl from "./Status.module.css";
import PropTypes from "prop-types";
import {useContext} from "react";
import {Context} from "../../../index";
import {getOfflineInfo, isUserOnline} from "../../../utils/users";
import {observer} from "mobx-react-lite";

const Status = ({userId, disableHover}) => {
	const {store} = useContext(Context);
	const onlineUsers = store.onlineUsers;

	const disableHoverClassName = disableHover ? (" " + cl.no_hover) : "";
	// console.log(userId, disableHoverClassName);

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

export default observer(Status);
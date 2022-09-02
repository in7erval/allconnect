import React, {useContext, useEffect, useState} from "react";
import cl from "./NotificationsNav.module.css";
import {createPortal} from "react-dom";
import NotificationService from "../../../API/NotificationService";
import {useInfiniteQuery} from "@tanstack/react-query";
import Loader from "../../UI/Loader/Loader";
import {useInView} from "react-intersection-observer";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const NotificationsNav = () => {

	const [show, setShow] = useState(false);
	const {ref: lastElement, inView} = useInView();
	const {store} = useContext(Context);
	const userId = store.userId;
	const LIMIT_NOTIFICATIONS = 10;

	const fetchNotifications = ({pageParam: pageParameter = 1}) => {
		return NotificationService.getNotifications(userId, LIMIT_NOTIFICATIONS, pageParameter)
			.catch(error => store.addError(error));
	}

	const {
		isLoading,
		data,
		fetchNextPage,
		hasNextPage,
		refetch
	} = useInfiniteQuery(['userNotifications' + userId], fetchNotifications, {
		getNextPageParam: (lastPage, _pages) => {
			let lastPageNumber = lastPage.config.params.page;
			return LIMIT_NOTIFICATIONS * lastPageNumber < lastPage.data.count ? lastPageNumber + 1 : undefined;
		},
		refetchInterval: 1000,
		refetchIntervalInBackground: true,
		enabled: !!userId
	});

	useEffect(() => {
		refetch()
	}, [userId]);

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView]);

	return (
		<div className={cl.main}>
			<button
				type="button"
				onClick={() => setShow(!show)}
				className={show ? cl.active : cl.not_active}
			>
				Уведомления
			</button>
			{show && createPortal(
				<div className={cl.behind} onClick={() => setShow(false)}>
					<div className={cl.notifications} onClick={event => event.stopPropagation()}>
						{isLoading ? <Loader/> : (
							data.pages[0].data.body.length === 0 ? "Уведомлений нет" :
								data.pages.map((group, index) => (
									<React.Fragment key={index}>
										{group.data.body.map(element => (
											<div key={element._id}>{element.type} &quot;{element.additionalInfo.post.text}&quot; от {element.additionalInfo.user.firstName} {element.additionalInfo.user.lastName}</div>
										))}
									</React.Fragment>
								)))
						}
						<div ref={lastElement} style={{height: 20}}/>
					</div>
				</div>,
				document.querySelector("#app")
			)}
		</div>
	);
};

export default observer(NotificationsNav);
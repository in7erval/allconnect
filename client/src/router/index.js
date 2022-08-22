import {Navigate} from "react-router-dom";
import {lazy} from "react";

const Posts = lazy(() => import("../pages/Posts"));
const UserPage = lazy(() => import("../pages/UserPage/UserPage"));
const Login = lazy(() => import("../pages/Login/Login"));
const Messages = lazy(() => import("../pages/Messages/Messages"));
const MessageRoom = lazy(() => import("../pages/MessageRoom/MessageRoom"));
const Friends = lazy(() => import("../pages/Friends/Friends"));

export const routes = [
	{path: '/posts', element: isAuth => isAuth ? <Posts/> : <Navigate to="/login"/>},
	{path: '/user:id', element: isAuth => isAuth ? <UserPage/> : <Navigate to="/login"/>},
	{path: '/Login', element: isAuth => isAuth ? <Navigate to="/posts"/> : <Login/>},
	{path: '/messages', element: isAuth => isAuth ? <Messages/> : <Login/>},
	{path: '/messages/:id', element: isAuth => isAuth ? <MessageRoom/> : <Login/>},
	{path: '/friends', element: isAuth => isAuth ? <Friends/> : <Login/>},
	{path: '/friends/:id', element: isAuth => isAuth ? <Friends/> : <Login/>},
	{path: '/', element: isAuth => isAuth ? <Navigate to="/posts"/> : <Login/>}
]

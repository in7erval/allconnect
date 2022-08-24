import {Navigate} from "react-router-dom";
import {lazy} from "react";
import DefaultPage from "../components/DefaultPage";

const Posts = lazy(() => import("../pages/Posts"));
const UserPage = lazy(() => import("../pages/UserPage/UserPage"));
const Login = lazy(() => import("../pages/Login/Login"));
const Messages = lazy(() => import("../pages/Messages/Messages"));
const MessageRoom = lazy(() => import("../pages/MessageRoom/MessageRoom"));
const Friends = lazy(() => import("../pages/Friends/Friends"));

export const routes = [
	{path: '/posts', element: isAuth => isAuth ? <DefaultPage><Posts/></DefaultPage> : <Navigate to="/login"/>},
	{path: '/user:id', element: isAuth => isAuth ? <DefaultPage><UserPage/></DefaultPage> : <Navigate to="/login"/>},
	{path: '/Login', element: isAuth => isAuth ? <Navigate to="/posts"/> : <Login/>},
	{path: '/messages', element: isAuth => isAuth ? <DefaultPage><Messages/></DefaultPage> : <Login/>},
	{path: '/messages/:id', element: isAuth => isAuth ? <DefaultPage><MessageRoom/></DefaultPage> : <Login/>},
	{path: '/friends', element: isAuth => isAuth ? <DefaultPage><Friends/></DefaultPage> : <Login/>},
	{path: '/friends/:id', element: isAuth => isAuth ? <DefaultPage><Friends/></DefaultPage> : <Login/>},
	{path: '/', element: isAuth => isAuth ? <Navigate to="/posts"/> : <Login/>}
]

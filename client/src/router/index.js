import Posts from "../pages/Posts";
import UserPage from "../pages/UserPage/UserPage";
import Login from "../pages/Login/Login";
import Error from "../pages/Error";
import {Navigate} from "react-router-dom";
import Messages from "../pages/Messages/Messages";

export const routes = [
	{path: '/posts', element: isAuth => isAuth ? <Posts/> : <Navigate to="/login"/>},
	{path: '/user:id', element: isAuth => isAuth ? <UserPage/> : <Navigate to="/login"/>},
	{path: '/Login', element: isAuth => isAuth ? <Navigate to="/posts"/> : <Login/>},
	{path: '/messages', element: isAuth => isAuth ? <Messages/> : <Login/>},
	{path: '/', element: isAuth => isAuth ? <Navigate to="/posts"/> : <Login/>},
	{path: '/*', element: () => <Error/>}
]

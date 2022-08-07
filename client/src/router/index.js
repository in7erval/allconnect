import About from "../pages/About";
import Posts from "../pages/Posts";
import UserPage from "../pages/UserPage/UserPage";
import Login from "../pages/login/Login";
import Error from "../pages/Error";
import {Navigate} from "react-router-dom";

export const routes = [
	{path: '/about', element: isAuth => <About/>},
	{path: '/posts', element: isAuth => isAuth ? <Posts/> : <Navigate to="/login"/>},
	{path: '/user:id', element: isAuth => isAuth ? <UserPage/> : <Navigate to="/login"/>},
	{path: '/login', element: isAuth => isAuth ? <Navigate to="/posts"/> : <Login/>},
	{path: '/', element: isAuth => isAuth ? <Navigate to="/posts"/> : <Login/>},
	{path: '/*', element: isAuth => <Error/>}
]

import React, {useContext} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import Error from "../pages/Error";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";
import Posts from "../pages/Posts";
import Login from "../pages/login/Login";
import {routes} from "../router";

const AppRouter = () => {

	const {isAuth, isLoading} = useContext(AuthContext);
	console.log(isAuth);

	if (isLoading) {
		return <Loader/>;
	}

	return (
		<Routes>
			<Route path="/error" element={<Error/>}/>
			{/*<Route path="/" element={<Posts/>}/>*/}
			{/*<Route path="/*" element={<Error/>}/>*/}

			{/*<Route path="/login" element={isAuth ? <Navigate to={"/posts"}/> : <Login/>}/>*/}
			{/*<Route path="/posts" element={isAuth ? <Posts/> : <Navigate to={"/login"}/>}/>*/}
			{/*<Route path="*" element={isAuth ? <Posts/> : <Navigate to={"/login"}/>}/>*/}

			{routes.map(route =>
				<Route key={route.path} path={route.path} element={route.element(isAuth)}/>
			)}

			{/*{isAuth && privateRoutes.map(route =>*/}
			{/*	<Route key={route.path} path={route.path} element={route.element}/>)*/}
			{/*}*/}

		</Routes>
	);
};

export default AppRouter;
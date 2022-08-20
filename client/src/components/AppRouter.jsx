import {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Error from "../pages/Error";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";
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

			{/*<Route path="/Login" element={isAuth ? <Navigate to={"/posts"}/> : <Login/>}/>*/}
			{/*<Route path="/posts" element={isAuth ? <Posts/> : <Navigate to={"/Login"}/>}/>*/}
			{/*<Route path="*" element={isAuth ? <Posts/> : <Navigate to={"/Login"}/>}/>*/}

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
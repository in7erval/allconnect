import {Suspense, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Loader from "./UI/Loader/Loader";
import {routes} from "../router";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";
import UserAuthService from "../API/UserAuthService";
import {USER_ID} from "../constants";

const AppRouter = () => {
	const [user, loading, _error] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			UserAuthService.getUserByUid(user.uid)
				.then(response => {
					if (!response.error) {
						console.log("set USER_ID APPROUTER", response.user.user);
						localStorage.setItem(USER_ID, response.user.user);
					}
				});
		} else {
			localStorage.removeItem(USER_ID);
		}
	}, [user]);

	if (loading) {
		return <Loader/>;
	}
	const isAuth = user;

	return (
		<Suspense fallback={
			<div style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100vw",
				height: "80vh"
			}}>
				<Loader/>
			</div>}>
			<Routes>
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
		</Suspense>

	);
};

export default AppRouter;
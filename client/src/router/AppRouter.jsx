import {Suspense, useContext, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Loader from "../components/UI/Loader/Loader";
import {routes} from "./index";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AppRouter = () => {

	const {store} = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth();
		}
	}, []);

	if (store.isLoading) {
		return <Loader/>;
	}

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
				{routes.map(route =>
					<Route key={route.path} path={route.path} element={route.element(store.isAuth)}/>
				)}

			</Routes>
		</Suspense>

	);
};

export default observer(AppRouter);
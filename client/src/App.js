import {useEffect, useState} from 'react';

import './styles/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";
import {useSelector} from "react-redux";
import Popup from './components/UI/Popup/Popup.jsx';

function App() {

	const errors = useSelector(state => state.errorReducer.errors);
	useSelector(state => console.log(state));

	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setLoading] = useState(true);


	useEffect(() => {
		// или какойто запрос на сервер
		if (localStorage.getItem('auth')) {
			setIsAuth(true);
		}
		setLoading(false);
	}, []);

	console.log("errors", errors);

	return (
		<AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
			<BrowserRouter>
				<Navbar/>
				<AppRouter/>
				<Popup errors={errors}/>
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App;

import './styles/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {useSelector} from "react-redux";
import Popup from './components/UI/Popup/Popup.jsx';
import "./firebase/index";

function App() {

	const errors = useSelector(state => state.errorReducer.errors);
	useSelector(state => console.log(state));

	console.log("errors", errors);

	return (
		// <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
		<BrowserRouter>
			<Navbar/>
			<AppRouter/>
			<Popup errors={errors}/>
		</BrowserRouter>
		// </AuthContext.Provider>
	)
}

export default App;

import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {errorReducer} from "./errorReducer";
import {authReducer} from "./authReducer";
import {usersOnlineReducer} from "./usersOnlineReducer";

const rootReducer = combineReducers({
	errorReducer: errorReducer,
	authReducer: authReducer,
	usersOnlineReducer: usersOnlineReducer
	//
	// cash: errorReducer,
	// customers: customerReducer
});



export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
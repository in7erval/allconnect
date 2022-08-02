import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {errorReducer} from "./errorReducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers({
	errorReducer: errorReducer,
	authReducer: authReducer
	//
	// cash: errorReducer,
	// customers: customerReducer
});



export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
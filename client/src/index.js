import {createContext} from 'react';
import App from './App';
import {createRoot} from "react-dom/client";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Store from "./store/store";

const store = new Store();

export const Context = createContext({store,});

const container = document.querySelector('#app');
const root = createRoot(container);
root.render(
	<Context.Provider value={{
		store
	}}>
		<App/>
	</Context.Provider>
);

serviceWorkerRegistration.register();

reportWebVitals(console.log);

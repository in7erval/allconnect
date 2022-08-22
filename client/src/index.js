import _React from 'react';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/index";
import {createRoot} from "react-dom/client";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const container = document.querySelector('#app');
const root = createRoot(container);
root.render(
	<Provider store={store}>
		<App/>
	</Provider>
);

serviceWorkerRegistration.register();

reportWebVitals(console.log);

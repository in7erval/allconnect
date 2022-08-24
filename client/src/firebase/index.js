import {initializeApp} from "firebase/app";
import {firebaseConfig} from "./secrets";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import UserAuthService from "../API/UserAuthService";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signInWithEmailPassword = async (email, password) => {
	return signInWithEmailAndPassword(auth, email, password)
		.then(response => UserAuthService.getUserByUid(response.user.uid));
}

export const registerWithEmailAndPassword = async (firstName, lastName, email, password) => {
	return createUserWithEmailAndPassword(auth, email, password)
		.then(response => UserAuthService.registerUser({
				uid: response.user.uid,
				email,
				firstName, lastName,
				metadata: response.user.metadata
			}))
};


// const analytics = getAnalytics(app);



const SET_USERS = "SET_USERS";
// const DELETE_ERROR = "DELETE_ERROR";

const defaultState = {
	users: []
};

export const usersOnlineReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_USERS: {
			console.log("set users");
			return {...state, users: [...action.payload]};
		}
		default:
			return state;
	}
}

export const setUsers = (payload) => ({type: SET_USERS, payload});


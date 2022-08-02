const SET_ID = "SET_ID";
const DELETE_ID = "DELETE_ID";

const defaultState = {
	id: null
};


export const authReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_ID:
			console.log("set id");
			return {...state, id: action.payload};
		case DELETE_ID:
			console.log("delete id");
			return {...state, id: null};
		default:
			return state;
	}
}

export const setId = (payload) => ({type: SET_ID, payload});
export const deleteId = (payload) => ({type: DELETE_ID, payload});


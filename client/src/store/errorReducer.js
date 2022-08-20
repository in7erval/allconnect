const SET_ERROR = "SET_ERROR";
const DELETE_ERROR = "DELETE_ERROR";

const defaultState = {
	errors: []
};

const hasError = (errors, errorCode) => {
	for (let error of errors) {
		if (error.code === errorCode) {
			return true;
		}
	}
	return false;
}

const findIndexErrorCode = (errors, errorCode) => {
	for (const [index, error] of errors.entries()) {
		if (error.code === errorCode) {
			return index;
		}
	}
	return -1;
}


export const errorReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_ERROR: {
			console.log("set error");
			let alreadyHasThisError = hasError(state.errors, action.payload.code);
			if (alreadyHasThisError) {
				let indexCode = findIndexErrorCode(state.errors, action.payload.code);
				state.errors.splice(indexCode, 1);
			}

			return {...state, errors: [...state.errors, action.payload]};
		}
		case DELETE_ERROR: {
			console.log("delete error");
			let index = action.payload;
			return {...state, errors: state.errors.filter((v, index_) => index_ !== index)};
		}
		default:
			return state;
	}
}

export const parseError = (payload) => ({type: SET_ERROR, payload});
export const deleteError = (payload) => ({type: DELETE_ERROR, payload});


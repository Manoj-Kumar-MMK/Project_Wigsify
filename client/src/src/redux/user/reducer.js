import { actionTypes } from "./types"

const initialState = {
	email: "",
	logged: false,
	token: "",
	userId: 0,
	error: "",
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				logged: true,
				userId: action.payload.userid,
				email: action.payload.email,
				token: action.payload.token,
			}
		case actionTypes.RESET_USER:
			return {
				logged: false,
				userId: 0,
				email: "",
				token: "",
				error: "",
			}
		case actionTypes.SET_ERROR:
			return {
				logged: false,
				error: action.payload,
			}
		default:
			return state
	}
}

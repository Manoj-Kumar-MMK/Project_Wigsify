import { actionTypes } from "./types"
const initialState = {
	followers: [],
	currentChat: {},
}
export const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_CHAT:
			return {
				...state,
				currentChat: action.payload,
			}
		case actionTypes.SET_FOLLOWERS:
			return {
				...state,
				followers: action.payload,
			}
		default:
			return state
	}
}

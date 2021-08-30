import { actionTypes } from "./types"
const initialState = {
	details: {},
	mode: "view",
}
export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_PROFILE:
			return {
				...state,
				details: action.payload,
			}
		case actionTypes.SET_PROFILE_MODE:
			return {
				...state,
				mode: action.payload,
			}
		default:
			return state
	}
}

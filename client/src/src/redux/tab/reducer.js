import { actionTypes } from "./types"
const initialState = {
	active: "Posts",
	dummy: "",
}
export const tabReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_TAB:
			return {
				...state,
				active: action.payload,
			}
		default:
			return state
	}
}

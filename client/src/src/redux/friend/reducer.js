import { actionTypes } from "./types"
const initialState = {
	keyword: "",
	mode: "all",
	list: [],
}
export const friendReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_KEYWORD:
			return {
				...state,
				keyword: action.payload,
			}
		case actionTypes.SET_FRIEND_MODE:
			return {
				...state,
				mode: action.payload,
			}
		case actionTypes.SET_FRIEND_LIST:
			return {
				...state,
				list: action.payload,
			}
		default:
			return state
	}
}

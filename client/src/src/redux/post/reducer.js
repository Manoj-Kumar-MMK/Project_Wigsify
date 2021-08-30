import { actionTypes } from "./types"
const initialState = {
	mode: "all",
	posts: [],
	editing: {},
}
export const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_POST_MODE:
			return {
				...state,
				mode: action.payload,
			}
		case actionTypes.SET_POSTS:
			return {
				...state,
				posts: action.payload,
			}
		case actionTypes.SET_EDITING_POST:
			return {
				...state,
				editing: action.payload,
			}
		default:
			return state
	}
}

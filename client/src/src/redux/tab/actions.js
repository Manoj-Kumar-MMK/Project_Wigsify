import { actionTypes } from "./types"
export const setTab = (tab) => {
	return {
		type: actionTypes.SET_TAB,
		payload: tab,
	}
}

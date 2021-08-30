import { actionTypes } from "./types"
import axios from "axios"
import { base, routes } from "../"

export const setCurrentChat = (follower) => {
	return {
		type: actionTypes.SET_CURRENT_CHAT,
		payload: follower,
	}
}

export const setFollowers = (followers) => {
	return {
		type: actionTypes.SET_FOLLOWERS,
		payload: followers,
	}
}

export const fetchFollowers = () => async (dispatch, getState) => {
	const userId = getState().user.userId
	try {
		const res = await axios.get(base + routes.friends.followers + userId)
		console.log(res.data)
		switch (res.status) {
			case 200:
				dispatch(setFollowers(res.data))
				dispatch(setCurrentChat(res.data[0]))
				break
			default:
		}
	} catch (err) {
		console.log(err)
	}
}

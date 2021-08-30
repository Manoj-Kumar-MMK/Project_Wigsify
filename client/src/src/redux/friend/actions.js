import { actionTypes } from "./types"
import axios from "axios"
import { base, routes } from "../"

export const setKeyword = (data) => {
	return {
		type: actionTypes.SET_KEYWORD,
		payload: data,
	}
}

export const setFriendMode = (data) => {
	return {
		type: actionTypes.SET_FRIEND_MODE,
		payload: data,
	}
}

export const setFriendList = (data) => {
	return {
		type: actionTypes.SET_FRIEND_LIST,
		payload: data,
	}
}

export const fetchFriend = (keyword, mode) => async (dispatch, getState) => {
	let userId = getState().user.userId
	let tempUrl
	switch (mode) {
		case "all":
			tempUrl = base + routes.users.dynamic
			break
		case "followers":
			tempUrl = base + routes.friends.followers
			break
		case "following":
			tempUrl = base + routes.friends.following
			break
		default:
	}
	try {
		const res = await axios.get(tempUrl + (mode === "all" ? keyword : userId))
		switch (res.status) {
			case 200:
				dispatch(setFriendList(res.data))
				break
			default:
		}
	} catch (error) {
		console.log("Error : " + error)
	}
}

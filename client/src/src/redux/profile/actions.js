import { actionTypes } from "./types"
import axios from "axios"
import { base, routes } from "../"

export const setProfile = (data) => {
	return {
		type: actionTypes.SET_PROFILE,
		payload: data,
	}
}

export const setProfileMode = (data) => {
	return {
		type: actionTypes.SET_PROFILE_MODE,
		payload: data,
	}
}

export const getProfile = () => async (dispatch, getState) => {
	const token = getState().user.token
	try {
		const res = await axios.get(base + routes.users.currentProfile, {
			headers: { Authorization: token },
		})
		switch (res.status) {
			case 200:
				dispatch(setProfile(res.data))
				break
			default:
		}
	} catch (error) {
		console.log("Error : " + error)
	}
}

export const patchProfile = (data) => async (dispatch, getState) => {
	const token = getState().user.token
	try {
		const res = await axios.patch(base + routes.users.currentProfile, data, {
			headers: { Authorization: token },
		})
		console.log(data)
		switch (res.status) {
			case 201:
				dispatch(getProfile())
				break
			default:
		}
	} catch (error) {
		console.log("Error : " + error)
	}
}

export const patchProfilePic = (data) => async (dispatch, getState) => {
	console.log(data)
	const fd = new FormData()
	fd.append("profilepic", data)
	console.log("Form data : " + fd)
	const token = getState().user.token
	try {
		const res = await fetch(
			"http://localhost:3000/api/users/profile/profilepic",
			{
				method: "POST",
				headers: {
					Authorization: token,
				},
				body: fd,
			}
		)
		switch (res.status) {
			case 201:
				dispatch(getProfile())
				break
			default:
		}
	} catch (error) {
		console.log("Error : " + error)
	}
}

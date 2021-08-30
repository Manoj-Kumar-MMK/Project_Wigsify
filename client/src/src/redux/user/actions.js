import { actionTypes } from "./types"
import axios from "axios"
import { base, routes } from "../"

export const setUser = (data) => {
	return {
		type: actionTypes.SET_USER,
		payload: data,
	}
}
export const resetUser = () => {
	return {
		type: actionTypes.RESET_USER,
	}
}
export const setUserError = (data) => {
	return {
		type: actionTypes.SET_ERROR,
		payload: data,
	}
}
export const userLogin = (data) => async (dispatch) => {
	try {
		const res = await axios.post(base + routes.users.login, data)
		switch (res.status) {
			case 200:
				dispatch(setUser(res.data))
				break
			case 400:
				dispatch(setUserError(res.data))
				break
			default:
		}
	} catch (error) {
		console.log("Error : " + error)
	}
}
export const userSignUp = (data) => async (dispatch) => {
	try {
		const res = await axios.post(base + routes.users.signup, data)
		console.log(res.status, "hiiiiii");
		switch (res.status) {
			case 201 :
				dispatch(setUser(res.data))
				break
				
			// case 400:
			// 	console.log(res.status)
			// 	alert("email already exists")
			// 	break 
			default:
		}
	} catch (error) {
		console.log("Error : " + error)
		alert("email already exists")
	}
}

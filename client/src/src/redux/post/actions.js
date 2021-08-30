import { actionTypes } from "./types"
import axios from "axios"
import { base, routes } from "../"

export const setPostMode = (mode) => {
	return {
		type: actionTypes.SET_POST_MODE,
		payload: mode,
	}
}

export const setPosts = (posts) => {
	return {
		type: actionTypes.SET_POSTS,
		payload: posts,
	}
}

export const setEditingPost = (post) => {
	return {
		type: actionTypes.SET_EDITING_POST,
		payload: post,
	}
}

export const deletePost = (postid) => async (dispatch, getState) => {
	let token = getState().user.token
	try {
		const res = await axios.delete(base + routes.posts.postId + postid, {
			headers: { Authorization: token },
		})
		switch (res.status) {
			case "200":
				console.log("Post Created")
				break
			default:
				console.log("error creating post")
		}
	} catch (error) {
		console.log("Error : " + error)
	}
	dispatch(fetchPosts())
}

export const patchPost = (postid, data) => async (dispatch, getState) => {
	let token = getState().user.token
	const fd = new FormData()
	fd.append("name", data.name)
	fd.append("description", data.description)
	console.log(fd)
	try {
		const res = await axios.patch(base + routes.posts.postId + postid, data, {
			headers: {
				Authorization: token,
			},
		})
		switch (res.status) {
			case "200":
				console.log("Post Created")
				break
			case "201":
				console.log("Post Created")
				break
			default:
				console.log("error creating post")
		}
	} catch (error) {
		console.log("Error : " + error)
	}
	dispatch(fetchPosts())
}

export const createPost = (data) => async (dispatch, getState) => {
	console.log("Name :" + data.name)
	console.log("Name :" + data.description)
	console.log("Img :" + data.imgpath[0])

	let token = getState().user.token
	const fd = new FormData()
	fd.append("name", data.name)
	fd.append("description", data.description)
	fd.append("image", data.imgpath[0])
	console.log(fd)
	try {
		const res = await fetch(base + routes.posts.create, {
			method: "POST",
			headers: {
				Authorization: token,
			},
			body: fd,
		})
		switch (res.status) {
			case "200":
				console.log("Post Created")
				break
			case "201":
				console.log("Post Created")
				break
			default:
				console.log("error creating post")
		}
	} catch (error) {
		console.log("Error : " + error)
	}
	dispatch(fetchPosts())
}

export const fetchPosts = () => async (dispatch, getState) => {
	let tempUrl
	let userId = getState().user.userId
	const mode = getState().post.mode
	switch (mode) {
		case "self":
			tempUrl = base + routes.posts.userId + userId
			break
		case "all":
			tempUrl = base + routes.posts.allPosts
			break
		default:
	}
	try {
		const res = await axios.get(tempUrl)
		switch (res.status) {
			case 200:
				dispatch(setPosts(res.data))
				break
			default:
		}
	} catch (error) {
		console.log("Error : " + error)
	}
}

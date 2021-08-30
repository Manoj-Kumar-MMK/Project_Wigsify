import { actionTypes } from "./types"
import axios from "axios"
import { base, routes } from "../"

const setPlaylists = (playlists) => {
	return {
		type: actionTypes.SET_PLAYLISTS,
		payload: playlists,
	}
}

export const setSongUrl = (url) => {
	return {
		type: actionTypes.SET_SONG_URL,
		payload: url,
	}
}

export const setCurrentPlaylist = (playlist) => {
	return {
		type: actionTypes.SET_CURRENT_PLAYLIST,
		payload: playlist,
	}
}

export const fetchPlaylists = () => async (dispatch, getState) => {
	const token = getState().user.token
	try {
		const res = await axios.get(base + routes.music.currentPlaylist, {
			headers: { Authorization: token },
		})
		dispatch(setPlaylists(res.data))
		dispatch(setSongUrl(""))

		switch (res.status) {
			case 200 || 201:
				res.data.length !== 0
					? dispatch(fetchPlaylistDetails(res.data[0]))
					: dispatch(setCurrentPlaylist(null))
				break
			default:
		}
	} catch (err) {
		console.log(err)
	}
}

export const fetchPlaylistDetails =
	(playlist) => async (dispatch, getState) => {
		const token = getState().user.token
		try {
			const res = await fetch(
				base + routes.music.getSongsByPlaylist + playlist.album_name,
				{
					method: "GET",
					headers: { Authorization: token },
				}
			)
			const data = await res.json()
			switch (res.status) {
				case 200 || 201:
					dispatch(setCurrentPlaylist({ ...playlist, songs: data }))
					dispatch(setSongUrl(""))

					break
				default:
			}
		} catch (err) {
			console.log(err)
		}
	}

export const addPlaylist = (data) => async (dispatch, getState) => {
	const fd = new FormData()
	fd.append("name", data.name)
	fd.append("image", data.image[0])
	const token = getState().user.token
	try {
		const res = await fetch(base + routes.music.createPlaylist, {
			method: "POST",
			body: fd,
			headers: { Authorization: token },
		})
		console.log(typeof res.status)
		switch (res.status) {
			case 201:
				console.log("addas")
				dispatch(fetchPlaylists())
				break
			default:
		}
	} catch (err) {
		console.log(err)
	}
}

export const deletePlaylist = () => async (dispatch, getState) => {
	const token = getState().user.token
	const album_name = getState().music.currentPlaylist.album_name
	try {
		const res = await axios.delete(
			base + routes.music.deletePlaylist + album_name,
			{
				headers: { Authorization: token },
			}
		)
		switch (res.status) {
			case 200:
				dispatch(fetchPlaylists())
				break
			default:
		}
	} catch (err) {
		console.log(err)
	}
}

export const addSong = (data) => async (dispatch, getState) => {
	const token = getState().user.token
	const playlist = getState().music.currentPlaylist
	const fd = new FormData()
	fd.append("name", data.name)
	fd.append("album_name", playlist.album_name)
	fd.append("song", data.song[0])
	fd.append("singer", data.singer)
	try {
		const res = await fetch(base + routes.music.createSong, {
			method: "POST",
			headers: { Authorization: token },
			body: fd,
		})

		switch (res.status) {
			case 201:
				dispatch(fetchPlaylistDetails(playlist))
				break
			default:
		}
	} catch (err) {
		console.log(err)
	}
}
export const deleteSong = (song_name) => async (dispatch, getState) => {
	const token = getState().user.token
	const playlist = getState().music.currentPlaylist
	try {
		const res = await axios.post(
			base + routes.music.deleteSong,
			{ song_name: song_name, album_name: playlist.album_name },
			{
				headers: { Authorization: token },
			}
		)
		switch (res.status) {
			case 200:
				console.log("dellete")
				dispatch(fetchPlaylistDetails(playlist))
				break
			default:
		}
	} catch (err) {
		console.log(err)
	}
}

import { actionTypes } from "./types"
const initialState = {
	playlists: [],
	currentPlaylist: {},
	songUrl: "",
}
export const musicReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_PLAYLISTS:
			return {
				...state,
				playlists: action.payload,
			}
		case actionTypes.SET_CURRENT_PLAYLIST:
			return {
				...state,
				currentPlaylist: action.payload,
			}
		case actionTypes.SET_SONG_URL:
			return {
				...state,
				songUrl: action.payload,
			}
		default:
			return state
	}
}

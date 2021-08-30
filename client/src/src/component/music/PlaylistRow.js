import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPlaylistDetails } from "../../redux"

const PlaylistRow = (playlist) => {
	const { album_name, album_photo_url } = playlist
	const dispatch = useDispatch()
	const currentPlaylist = useSelector((state) => state.music.currentPlaylist)
	const changePlaylist = () => {
		dispatch(fetchPlaylistDetails(playlist))
	}

	return (
		<div
			className={`playlistRow ${
				currentPlaylist?.album_name === album_name && "active"
			}`}
			onClick={() => changePlaylist()}
		>
			<img src={album_photo_url} alt="" />
			{album_name}
		</div>
	)
}

export default PlaylistRow

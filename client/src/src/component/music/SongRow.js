import { DeleteForever } from "@material-ui/icons"
import React from "react"
import { useDispatch } from "react-redux"
import { deleteSong, setSongUrl } from "../../redux"
const SongRow = (song) => {
	const dispatch = useDispatch()
	const { song_name, singer, song_url } = song
	const playThisSong = () => {
		dispatch(setSongUrl(song_url))
	}
	return (
		<div className="songRow" onClick={playThisSong}>
			<DeleteForever onClick={() => dispatch(deleteSong(song_name))} />
			<p>{song_name}</p>
			<p className="singer">{singer} (singer)</p>
		</div>
	)
}

export default SongRow

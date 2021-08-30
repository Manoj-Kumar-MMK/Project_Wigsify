import React, { useState } from "react"
import SongRow from "./SongRow"
import ModalSong from "./ModalSong"
import { deletePlaylist } from "../../redux"
import { useDispatch, useSelector } from "react-redux"
import ReactAudioPlayer from "react-audio-player"

const SongBox = () => {
	const currentPlaylist = useSelector((state) => state.music.currentPlaylist)
	const dest = () => {
		return !currentPlaylist
			? { album_name: "", album_photo_url: "", songs: [] }
			: currentPlaylist
	}
	const { album_name, album_photo_url, songs } = dest()
	const songUrl = useSelector((state) => state.music.songUrl)
	const dispatch = useDispatch()
	const handleDelete = () => {
		dispatch(deletePlaylist())
	}
	const [show, setShow] = useState(false)
	const toggle = () => {
		setShow(!show)
	}
	return currentPlaylist ? (
		<div className="songBox">
			<div className="songBox__header">
				<img src={album_photo_url} alt="discover" />{" "}
				{/* !o  change to get from redux */}
				<div className="songBox__headerText">
					<h1>{album_name}</h1>
					<h2>Songs : {songs?.length}</h2>
					<div className="songBox__delete" onClick={() => handleDelete()}>
						Delete
					</div>
					<div className="songBox__addSong" onClick={toggle}>
						Add a song
					</div>
				</div>
			</div>
			<div className="songBox__body">
				<h1>Songs</h1>
				<div className="songBox__songs">
					{songs?.map((song, ind) => (
						<SongRow key={ind} {...song} />
					))}
				</div>
			</div>
			{songUrl && (
				<div className="songBox__audio">
					<ReactAudioPlayer controls src={songUrl} />
				</div>
			)}
			<ModalSong show={show} toggle={toggle} />
		</div>
	) : (
		<div className="songBox">
			<h1>Select a Playlist</h1>
		</div>
	)
}

export default SongBox

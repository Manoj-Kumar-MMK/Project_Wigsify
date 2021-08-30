import React, { useEffect, useState } from "react"
import PlaylistRow from "./PlaylistRow"
import { fetchPlaylists } from "../../redux"
import { useDispatch, useSelector } from "react-redux"
import ModalPlaylist from "./ModalPlaylist"
import { AddOutlined } from "@material-ui/icons"
const Playlists = () => {
	const playlists = useSelector((state) => state.music.playlists)
	const [show, setShow] = useState(false)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchPlaylists())
	}, [dispatch])
	const toggle = () => {
		setShow(!show)
	}
	return (
		<div className="playlists">
			<h4>Playlists</h4>
			{playlists?.map((playlist, ind) => (
				<PlaylistRow key={ind} {...playlist} />
			))}
			<div className="playlists__add" onClick={() => toggle()}>
				<AddOutlined />
			</div>
			<ModalPlaylist show={show} toggle={() => toggle()} />
		</div>
	)
}

export default Playlists

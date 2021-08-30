import React from "react"
import Playlists from "./Playlists"
import SongBox from "./SongBox"

const MusicContainer = () => {
	return (
		<div className="musicContainer">
			<SongBox />
			<Playlists />
		</div>
	)
}

export default MusicContainer

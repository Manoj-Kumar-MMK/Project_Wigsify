import React from "react"
import { useSelector } from "react-redux"
import Profile from "./Profile"
import ProfilePicUpdate from "./ProfilePicUpdate"
import ProfileUpdate from "./ProfileUpdate"

const ProfileContainer = () => {
	const mode = useSelector((state) => state.profile.mode)
	const switchmode = () => {
		switch (mode) {
			case "view":
				return <Profile />
			case "update":
				return <ProfileUpdate />
			case "updatePic":
				return <ProfilePicUpdate />
			default:
		}
	}
	return <div className="profileContainer">{switchmode()}</div>
}

export default ProfileContainer

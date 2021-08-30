import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { patchProfilePic, setProfileMode } from "../../redux"

const ProfilePicUpdate = ({ toggle }) => {
	const dispatch = useDispatch()
	const [avatarUrl, setAvatarUrl] = useState(null)
	const fileRef = useRef()

	const changeAvatarUrl = (imagefile) => {
		const fr = new FileReader()
		fr.readAsDataURL(imagefile)
		fr.onload = (e) => setAvatarUrl(e.target.result)
	}

	const handleSubmit = () => {
		dispatch(patchProfilePic(fileRef.current.files[0]))
		dispatch(setProfileMode("view"))
	}

	return (
		<div className="profilePicUpdate">
			<label className="fileUpload">
				<span>Upload</span>
				<input
					ref={fileRef}
					type="file"
					onChangeCapture={(e) => changeAvatarUrl(e.target.files[0])}
				/>
			</label>

			<div className="profilePicUpdate__preview">
				<img src={avatarUrl} alt="" />
			</div>
			<div className="fileUploadSubmit" onClick={handleSubmit}>
				Submit
			</div>
		</div>
	)
}

export default ProfilePicUpdate

import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addPlaylist } from "../../redux"

const ModalPlaylist = ({ show, toggle }) => {
	const { register, handleSubmit} = useForm({
		defaultValues: { name: "" },
	})
	const imageRef = useRef()
	const dispatch = useDispatch()
	const changeImageUrl = (imagefile) => {
		const fr = new FileReader()
		fr.readAsDataURL(imagefile)
		fr.onload = (e) => (imageRef.current.src = e.target.result)
	}

	const onSubmit = (data) => {
		dispatch(addPlaylist(data))
		toggle()
	}
	const handleClose = () => {
		toggle()
	}
	return (
		<div className={`modal ${show && "active"}`}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					{...register("name")}
					placeholder="Enter Playlist Name"
				/>
				<label className="fileUpload">
					<span>Upload Album Picture</span>
					<input
						type="file"
						{...register("image")}
						onChangeCapture={(e) => changeImageUrl(e.target.files[0])}
					/>
				</label>

				<img ref={imageRef} alt="Upload a pic" />
				<button type="submit" className="modal__submit">
					Create a Playlist
				</button>
				<button type="button" className="modal__exit" onClick={handleClose}>
					Cancel
				</button>
			</form>
		</div>
	)
}

export default ModalPlaylist

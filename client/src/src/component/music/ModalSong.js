import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addSong } from "../../redux"

const ModalPlaylist = ({ show, toggle }) => {
	const { register, handleSubmit } = useForm({
		defaultValues: { name: "", singer: "" },
	})
	const dispatch = useDispatch()
	const onSubmit = (data) => {
		dispatch(addSong(data))
		toggle()
	}
	return (
		<div className={`modal ${show && "active"}`}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Enter song name"
					{...register("name", { required: "Song Name is required" })}
				/>
				<input
					placeholder="Enter singer name"
					type="text"
					{...register("singer", { required: "Singer Name is required" })}
				/>
				<label className="fileUpload">
					<span>Upload Song</span>
					<input type="file" {...register("song")} />
				</label>
				<button className="modal__submit" type="submit">
					Create a Song
				</button>
				<button type="button" className="modal__exit" onClick={toggle}>
					Cancel
				</button>
			</form>
		</div>
	)
}

export default ModalPlaylist

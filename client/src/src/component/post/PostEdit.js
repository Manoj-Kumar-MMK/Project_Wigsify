import React, { useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Post from "./Post"
import { useDispatch, useSelector } from "react-redux"
import { createPost, patchPost, setPostMode } from "../../redux"

const schema = yup.object().shape({
	name: yup.string().required("Title is mandatory"),
	description: yup
		.string()
		.required("Caption is mandatory")
		.min(5, "Too short"),
})

const PostEdit = ({ create }) => {
	const postEdit = useSelector((state) => state.post.editing)

	const destCond = () =>
		create === true
			? {
					name: "",
					descritpion: "",
					postid: 0,
			  }
			: postEdit

	const { name, description, postid } = destCond()
	const [preview, setPreview] = useState(false)
	const [params, setParams] = useState({})
	const [imageUrl, setImageUrl] = useState("")
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: { name: name, description: description, postid: postid },
		resolver: yupResolver(schema),
	})

	const changeImageUrl = (imagefile) => {
		const fr = new FileReader()
		fr.readAsDataURL(imagefile)
		fr.onload = (e) => setImageUrl(e.target.result)
	}

	const onSubmit = (data) => {
		setParams({
			name: data.name,
			description: data.description,
			imgpath: imageUrl,
			postid: postid,
		})
		setPreview(true)
	}

	const createPostWrap = () => {
		const data = getValues()
		dispatch(createPost(data))
		dispatch(setPostMode("self"))
	}

	const editPostWrap = () => {
		const data = getValues()
		dispatch(patchPost(postid, data))
		dispatch(setPostMode("self"))
	}

	return (
		<div className="postEdit">
			<form className="postEdit__form" onSubmit={handleSubmit(onSubmit)}>
				<label>Title :</label>
				<input type="text" {...register("name")} />
				{errors.name && <p>{errors.name.message}</p>}

				<label>Caption :</label>
				<input type="text" {...register("description")} />
				{errors.descrition && <p>{errors.description.message}</p>}

				<label className="fileUpload">
					<span>Upload Post Picture</span>

					<input
						type="file"
						onChangeCapture={(e) => changeImageUrl(e.target.files[0])}
						{...register("imgpath")}
					/>
				</label>

				<button type="submit" className="postEdit__formSubmit">
					SUBMIT
				</button>
			</form>
			{preview && (
				<div className="postEdit__preview">
					<Post {...params} />
					{create ? (
						<div className="postEdit__upload" onClick={() => createPostWrap()}>
							Click here to Create
						</div>
					) : (
						<div className="postEdit__upload" onClick={() => editPostWrap()}>
							Click here to Apply the changes
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default PostEdit

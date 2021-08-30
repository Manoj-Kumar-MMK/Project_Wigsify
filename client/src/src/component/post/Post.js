import React from "react"
import { useDispatch } from "react-redux"
import { deletePost, setEditingPost, setPostMode } from "../../redux"
const Post = (props) => {
	const { name, description, postid, imgpath, self } = props
	const dispatch = useDispatch()
	const handleEdit = () => {
		dispatch(setEditingPost(props))
		dispatch(setPostMode("edit"))
	}
	const handleDelete = () => {
		dispatch(deletePost(postid))
	}
	return (
		<div className="post">
			<div className="post__header">
				<p>{name}</p>
				{self === true && (
					<>
						<div className="post__edit" onClick={() => handleEdit()}>
							Edit
						</div>
						<div className="post__delete" onClick={() => handleDelete()}>
							Delete
						</div>
					</>
				)}
			</div>
			<div className="post__img">
				<img src={imgpath} alt="" />
			</div>
			<div className="post__details">
				<p>Caption : {description}</p>
			</div>
		</div>
	)
}

export default Post

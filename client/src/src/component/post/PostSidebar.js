import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPostMode } from "../../redux/"
const PostSidebar = () => {
	const mode = useSelector((state) => state.post.mode)
	const dispatch = useDispatch()
	return (
		<div className="postSidebar">
			<div
				className={`${mode === "create" && "active"}`}
				onClick={() => dispatch(setPostMode("create"))}
			>
				Create
			</div>
			<div
				className={`${mode === "self" && "active"}`}
				onClick={() => dispatch(setPostMode("self"))}
			>
				My Posts
			</div>
			<div
				className={`${mode === "all" && "active"}`}
				onClick={() => dispatch(setPostMode("all"))}
			>
				All Posts
			</div>
		</div>
	)
}

export default PostSidebar

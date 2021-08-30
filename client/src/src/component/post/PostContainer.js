import React from "react"
import PostBox from "./PostBox"
import PostEdit from "./PostEdit"
import PostSidebar from "./PostSidebar"
import { useSelector } from "react-redux"

const PostContainer = () => {
	const mode = useSelector((state) => state.post.mode)
	const switchmode = () => {
		switch (mode) {
			case "all":
				return <PostBox />
			case "self":
				return <PostBox self />
			case "edit":
				return <PostEdit />
			case "create":
				return <PostEdit create />
			default:
		}
	}
	return (
		<div className="postContainer">
			{switchmode()}
			<PostSidebar />
		</div>
	)
}

export default PostContainer

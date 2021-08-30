import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../redux"
import Post from "./Post"

const PostBox = ({ self }) => {
	const finalposts = useSelector((state) => state.post.posts)
	const mode = useSelector((state) => state.post.mode)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchPosts())
	}, [mode, dispatch])

	return (
		<div className="postBox">
			{finalposts.map((post) => (
				<Post key={post.postid} {...post} self={self} />
			))}
		</div>
	)
}

export default PostBox

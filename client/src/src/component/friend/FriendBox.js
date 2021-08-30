import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFriend } from "../../redux/friend/actions"
import FriendCard from "./FriendCard"

const FriendBox = ({ search, friendOnly }) => {
	const list = useSelector((state) => state.friend.list)
	const keyword = useSelector((state) => state.friend.keyword)
	const mode = useSelector((state) => state.friend.mode)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchFriend(keyword, mode))
	}, [keyword, mode, dispatch])

	return (
		<div className="friendBox">
			{list.length > 0 ? (
				list.map((item) => <FriendCard {...item} />)
			) : (
				<h1>No Username matches</h1>
			)}
		</div>
	)
}

export default FriendBox

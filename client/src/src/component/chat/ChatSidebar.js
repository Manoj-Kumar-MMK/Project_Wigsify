import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFollowers } from "../../redux"
import ChatSidebarRow from "./ChatSidebarRow"
const ChatSidebar = () => {
	const followers = useSelector((state) => state.chat.followers)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchFollowers())
	}, [dispatch])
	return (
		<div className="chatSidebar">
			<h4>Chats</h4>
			{followers.map((follower, ind) => (
				<ChatSidebarRow key={ind} {...follower} />
			))}
		</div>
	)
}

export default ChatSidebar

import { Avatar } from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentChat } from "../../redux"

const ChatSidebarRow = (follower) => {
	const currentChat = useSelector((state) => state.chat.currentChat)
	const dispatch = useDispatch()
	return (
		<div
			className={`chatSidebarRow ${currentChat === follower && "active"}`}
			onClick={() => dispatch(setCurrentChat(follower))}
		>
			<Avatar src={follower.profile_pic_path}></Avatar>
			<p>{follower.name}</p>
		</div>
	)
}

export default ChatSidebarRow

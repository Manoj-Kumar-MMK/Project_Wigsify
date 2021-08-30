import React from "react"
import ChatBox from "./ChatBox"
import { useSelector } from "react-redux"
import ChatError from "./ChatError"

const ChatBoxWrap = () => {
	const currentChat = useSelector((state) => state.chat.currentChat)
	const fid = currentChat?.id
	return fid ? <ChatBox fid={fid} /> : <ChatError />
}

export default ChatBoxWrap

import React from "react"
import ChatBoxWrap from "./ChatBoxWrap"
import ChatSidebar from "./ChatSidebar"

const ChatContainer = () => {
	return (
		<div className="chatContainer">
			<ChatBoxWrap />
			<ChatSidebar />
		</div>
	)
}

export default ChatContainer

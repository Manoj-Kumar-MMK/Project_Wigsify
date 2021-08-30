import { Avatar, IconButton } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { useSelector } from "react-redux"
import React, { useEffect, useRef, useState } from "react"
import socketIOClient from "socket.io-client"
import Message from "./Message"
import FlipMove from "react-flip-move"
//chat server endpoint
const SERVER_ENDPOINT = "http://localhost:3300"
//props
const GET_CHATS_URL = "http://localhost:3000/api/chats"

const ChatBox = ({ fid }) => {
	const myid = parseInt(useSelector((state) => state.user.userId))
	const currentChat = useSelector((state) => state.chat.currentChat)

	const [input, setInput] = useState("")
	const handleInput = (e) => {
		if (e.keyCode === 13) sendMessage()
	}

	const socketRef = useRef()
	const [messages, setMessages] = useState([])
	console.log(typeof myid, "jgfhgfv", typeof fid)
	useEffect(() => {
		async function getCurrentUserChats() {
			const response = await fetch(GET_CHATS_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid: myid,
					fid: fid,
				}),
			})
			const chats_data = await response.json()
			console.log(chats_data)
			setMessages([...chats_data])
			checkScroll()
		}
		if (fid) getCurrentUserChats()
	}, [myid, fid])

	useEffect(() => {
		if (fid) {
			socketRef.current = socketIOClient(SERVER_ENDPOINT, {
				query: { myid, fid },
			})
			console.log("connected")
			socketRef.current.emit("joinroom", { myid, fid })
		}
		return () => {
			if (fid) socketRef.current.close()
		}
	}, [myid, fid])

	// socketRef instance waiting for new msg event from the server
	useEffect(() => {
		if (socketRef.current && fid) {
			socketRef.current.on("msg", (data) => {
				console.log(data)

				setMessages((messages) => [...messages, data])
	
				checkScroll()
			})
		}
	}, [myid, fid])

	// eventhandler for sending msg to server

	function sendMessage() {
		let chat_msg = input
		console.log(chat_msg)
		setInput("")
		//emitting to server
		socketRef.current.emit("sendMsg", {
			message: chat_msg,
			myid: myid,
			fid: fid,
		})
		// outputMessage(chat_msg)
	}

	const checkScroll = () => {
		let chatBox = document.querySelector(".chatBox__body")

		chatBox.scrollTop = chatBox.scrollHeight
	}

	return (
		<div className="chatBox">
			<div className="chatBox__header">
				<Avatar src={currentChat?.profile_pic_path}>M</Avatar>
				<h3>{currentChat?.name}</h3>
			</div>
			<div className="chatBox__body">
				<FlipMove>
					{messages?.map((message, ind) => (
						<Message
							key={ind}
							self={message.username === myid}
							text={message.msg}
							timestamp={message.timestamp}
						/>
					))}
				</FlipMove>
			</div>
			<div className="chatBox__input">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyUp={(e) => handleInput(e)}
					placeholder="Type a message"
				/>
				<div onClick={() => sendMessage()}>
					<IconButton>
						<Send />
					</IconButton>
				</div>
			</div>
		</div>
	)
}

export default ChatBox

import React, { forwardRef } from "react"

const Message = forwardRef(({ text, self, timestamp }, ref) => {
	return (
		<div ref={ref} className={`message__${self ? "self" : "other"}`}>
			<p>{text}</p>
			<span className="timestamp">{timestamp}</span>
		</div>
	)
})

export default Message

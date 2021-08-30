import React, { useState } from "react"
import Code from "./Code"
import Display from "./Display"

const GitContainer = () => {
	const [show, setShow] = useState(false)
	return (
		<div className="gitContainer">
			{show ? <Display /> : <Code />}
			<button onClick={() => setShow(!show)}>Change Mode</button>
		</div>
	)
}

export default GitContainer

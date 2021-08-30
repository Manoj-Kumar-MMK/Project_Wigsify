import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import './code.css';

const Display = () => {
	const userId = useSelector((state) => state.user.userId)
	const [files, setFiles] = useState([])
	useEffect(() => {
		const req = async () => {
			try {
				const res = await fetch("http://localhost:3000/api/code/" + userId, {
					method: "GET",
				})
				switch (res.status) {
					case 200:
						setFiles(await res.json())
						break
					default:
						console.log("default")
				}
			} catch (err) {}
		}
		req()
	}, [userId])

	return (
		<div className="display__wrap">
			<h1> YOUR FILES </h1>
			<div className="display__files">
			
				{files?.map(({ name, code_url }, ind) => (
					<div key={ind} className="card">
						<h3>{name}</h3>
						<p>URL : <a href={code_url} target="_blank"  rel="noreferrer">{code_url}</a></p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Display

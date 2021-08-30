export function outputMessage(data, myid) {
	const div = document.createElement("div")
	data.senderid === myid
		? div.classList.add("message__self")
		: div.classList.add("message__other")

	const para = document.createElement("p")
	para.classList.add("text")
	para.innerText = data.msg
	console.dir(para)
	div.appendChild(para)

	document.querySelector(".chatBox__body").appendChild(div)
}

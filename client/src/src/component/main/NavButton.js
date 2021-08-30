import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTab } from "../../redux"
const NavButton = ({ Icon, tab }) => {
	const activeTab = useSelector((state) => state.tab.active)
	const dispatch = useDispatch()
	return (
		<div
			className={`navButton ${activeTab === tab ? "active" : null}`}
			onClick={() => dispatch(setTab(tab))}
		>
			<Icon />
			{tab}
		</div>
	)
}

export default NavButton

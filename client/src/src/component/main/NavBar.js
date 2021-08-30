import { ExitToApp } from "@material-ui/icons"
import React from "react"
import { useDispatch } from "react-redux"
import { resetUser } from "../../redux"
import NavButton from "./NavButton"

const NavBar = ({ tabs }) => {
	const dispatch = useDispatch()

	return (
		<div className="navBar">
			<h4>TABS</h4>
			{tabs.map(({ tab, Icon }, ind) => (
				<NavButton key={ind} Icon={Icon} tab={tab} />
			))}
			<div className="navButton" onClick={() => dispatch(resetUser())}>
				<ExitToApp /> Logout
			</div>
		</div>
	)
}

export default NavBar

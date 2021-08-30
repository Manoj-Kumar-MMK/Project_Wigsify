import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriendMode, setKeyword } from "../../redux/friend/actions"
const FriendSidebar = () => {
	const keyword = useSelector((state) => state.friend.keyword)
	const mode = useSelector((state) => state.friend.mode)
	const dispatch = useDispatch()
	return (
		<div className="friendSidebar">
			{mode === "all" && (
				<input
					type="text"
					value={keyword}
					placeholder="Search by username"
					onChange={(e) => dispatch(setKeyword(e.target.value))}
				/>
			)}
			<div
				className={`friendSidebar__row ${mode === "all" && "active"}`}
				onClick={() => dispatch(setFriendMode("all"))}
			>
				All Users
			</div>
			<div
				className={`friendSidebar__row ${mode === "followers" && "active"}`}
				onClick={() => dispatch(setFriendMode("followers"))}
			>
				Followers
			</div>
			<div
				className={`friendSidebar__row ${mode === "following" && "active"}`}
				onClick={() => dispatch(setFriendMode("following"))}
			>
				Following
			</div>
		</div>
	)
}

export default FriendSidebar

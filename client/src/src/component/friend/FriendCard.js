import { Avatar } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import ReactCardFlip from "react-card-flip"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { fetchFriend } from "../../redux"

const FriendCard = ({ id }) => {
	const token = useSelector((state) => state.user.token)
	const userId = useSelector((state) => state.user.userId)
	const mode = useSelector((state) => state.friend.mode)
	const [isFollowing, setIsFollowing] = useState(false)
	const [details, setDetails] = useState({})
	const dispatch = useDispatch()
	const [flip, setFlip] = useState(false)
	useEffect(() => {
		const req = async () => {
			try {
				const profile = await axios.get(
					"http://localhost:3000/api/users/profile/" + id
				)
				const followCheck = await axios.post(
					"http://localhost:3000/api/friends/isfollowing",
					{
						uid: userId,
						fid: id,
					}
				)
				switch (profile.status) {
					case 200:
						setDetails(profile.data)
						break
					default:
				}
				switch (followCheck.status) {
					case 200:
						setIsFollowing(followCheck.data.isFollowing)
						break
					default:
				}
			} catch (err) {
				console.log(err)
			}
		}
		req()
	}, [id, userId, isFollowing])
	const follow = async () => {
		try {
			const res = await axios.post(
				"http://localhost:3000/api/friends/follow",
				{ fid: id },
				{
					headers: { Authorization: token },
				}
			)
			switch (res.status) {
				case 201:
					setIsFollowing(true)
					break
				default:
			}
		} catch (err) {
			console.log(err)
		}
	}

	const unfollow = async () => {
		try {
			const res = await axios.post(
				"http://localhost:3000/api/friends/unfollow",
				{ fid: id },
				{
					headers: { Authorization: token },
				}
			)
			switch (res.status) {
				case 200:
					setIsFollowing(false)
					if (mode === "following") dispatch(fetchFriend("", mode))
					break
				default:
			}
		} catch (err) {
			console.log(err)
		}
	}
	const {
		name,
		About,
		FavLang,
		profile_pic_path,
		profession,
		followers,
		following,
		no_of_posts,
	} = details
	const FavLangArray = FavLang?.split(" ")
	return (
		<div className="friendCardBox">
			<ReactCardFlip
				isFlipped={flip}
				flipDirection="horizontal"
				infinite="1"
				flipSpeedBackToFront="0.9"
				flipSpeedFrontToBack="0.9"
			>
				<div
					className="friendCard friendCard__front"
					onMouseEnter={() => setFlip(true)}
				>
					<div className="friendCard__frontTop">
						<Avatar src={profile_pic_path}>M</Avatar>
						<h3>{name}</h3>
						<p>{profession}</p>
					</div>
					<div className="friendCard__frontBottom">
						<div>
							<p>Followers</p>
							<p>{followers}</p>
						</div>
						<div>
							<p>Following</p>
							<p>{following}</p>
						</div>
						<div>
							<p>Posts</p>
							<p>{no_of_posts}</p>
						</div>
					</div>
				</div>
				<div
					className="friendCard friendCard__back"
					onMouseLeave={() => setFlip(false)}
				>
					<div className="friendCard__backSkills">
						<h4>Favourite Languages:</h4>
						<ul>
							{FavLangArray?.map((lang) => (
								<li>{lang}</li>
							))}
						</ul>
					</div>

					<div className="friendCard__backAbout">
						<h4>About :</h4>
						<p>{About}</p>
					</div>
					{!isFollowing ? (
						<div className="friendCard__backFollow" onClick={follow}>
							Follow
						</div>
					) : (
						<div className="friendCard__backFollow" onClick={unfollow}>
							Unfollow
						</div>
					)}
				</div>
			</ReactCardFlip>
		</div>
	)
}

export default FriendCard

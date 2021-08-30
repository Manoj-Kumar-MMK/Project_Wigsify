import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfile, setProfileMode } from "../../redux/profile/actions"
const Profile = () => {
	const details = useSelector((state) => state.profile.details)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getProfile())
	}, [dispatch])
	const {
		profile_pic_path,
		name,
		email,
		mobile,
		profession,
		followers,
		following,
		no_of_posts,
		About,
		FavLang,
	} = details
	return (
		<div className="profile">
			<div className="profile__header">
				<img src={profile_pic_path} alt="asdsd" />
			</div>
			<div className="profile__body">
				<table>
					<tbody>
						<tr>
							<th>Name</th>
							<td>{name}</td>
						</tr>
						<tr>
							<th>Email</th>
							<td>{email}</td>
						</tr>
						<tr>
							<th>Mobile</th>
							<td>{mobile}</td>
						</tr>
						<tr>
							<th>Profession</th>
							<td>{profession}</td>
						</tr>
						<tr>
							<th>Followers</th>
							<td>{followers}</td>
						</tr>
						<tr>
							<th>Following</th>
							<td>{following}</td>
						</tr>
						<tr>
							<th>Posts</th>
							<td>{no_of_posts}</td>
						</tr>
						<tr>
							<th>About</th>
							<td>{About}</td>
						</tr>
						<tr>
							<th>Favourite Languages</th>
							<td>{FavLang}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div
				className="submit profile__button"
				onClick={() => dispatch(setProfileMode("update"))}
			>
				Click to Update Details
			</div>
			<div
				className="submit profile__button"
				onClick={() => dispatch(setProfileMode("updatePic"))}
			>
				Click to Update Picture
			</div>
		</div>
	)
}

export default Profile

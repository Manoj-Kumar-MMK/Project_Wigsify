import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { patchProfile, setProfileMode } from "../../redux"
import { useDispatch, useSelector } from "react-redux"

const schema = yup.object().shape({
	name: yup.string().required("Name is required").matches(),
	mobile: yup
		.number()
		.required("Mobile number is required")
		.test("mobileNoCheck", "Invalid", (num) => {
			let s = num.toString()
			return s.length === 10
		}),
	profession: yup.string().max(15, "Type in crisp about your profession"),
	About: yup.string().max(30, "Too long").min(10, "Too short"),
	FavLang: yup.string().max(30, "Too long").min(10, "Too short"),
})

//defValue from  req

const ProfileUpdate = () => {
	const details = useSelector((state) => state.profile.details)
	const dispatch = useDispatch()
	const defValue = {
		name: details.name,
		mobile: details.mobile,
		profession: details.profession,
		About: details.About,
		FavLang: details.FavLang,
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ defaultValues: defValue, resolver: yupResolver(schema) })

	const onSubmit = (data) => {
		dispatch(patchProfile(data))
		dispatch(setProfileMode("view"))
	}
	return (
		<div className="profileUpdate">
			<h1>Update your profile:</h1>
			<form className="profileUpdate__form" onSubmit={handleSubmit(onSubmit)}>
				<label>Name</label>
				<input type="text" {...register("name")} />
				{errors.name && <p className="login__error">{errors.name.message}</p>}

				<label>Mobile : </label>
				<input type="text" {...register("mobile")} />
				{errors.mobile && (
					<p className="login__error">{errors.mobile.message}</p>
				)}

				<label>Profession : </label>
				<input type="text" {...register("profession")} />
				{errors.profession && (
					<p className="login__error">{errors.profession.message}</p>
				)}

				<label>About : </label>
				<input type="textarea" {...register("About")} />
				{errors.About && <p className="login__error">{errors.About.message}</p>}

				<label>Favourite Languages : </label>
				<input type="textarea" {...register("FavLang")} />
				{errors.FavLang && (
					<p className="login__error">{errors.FavLang.message}</p>
				)}

				<input
					onClick={() => reset(defValue)}
					type="button"
					value="reset"
					className="reset"
				/>
				<input type="submit" className="submit" />
			</form>
		</div>
	)
}

export default ProfileUpdate

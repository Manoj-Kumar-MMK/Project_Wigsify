import { combineReducers } from "redux"
import { tabReducer } from "./tab/reducer"
import { userReducer } from "./user/reducer"
import { profileReducer } from "./profile/reducer"
import { friendReducer } from "./friend/reducer"
import { postReducer } from "./post/reducer"
import { chatReducer } from "./chat/reducer"
import { musicReducer } from "./music/reducer"

export const rootReducer = combineReducers({
	user: userReducer,
	tab: tabReducer,
	profile: profileReducer,
	friend: friendReducer,
	post: postReducer,
	chat: chatReducer,
	music: musicReducer,
})

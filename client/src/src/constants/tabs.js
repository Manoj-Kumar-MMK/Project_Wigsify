import MusicContainer from "../component/music/MusicContainer"
import PostContainer from "../component/post/PostContainer"
import ProfileContainer from "../component/profile/ProfileContainer"
import GitContainer from "../component/git/GitContainer"
import ChatContainer from "../component/chat/ChatContainer"
import FriendContainer from "../component/friend/FriendContainer"

import {
	AccountBox,
	PostAdd,
	Chat,
	GitHub,
	MusicNote,
	People,
} from "@material-ui/icons"
export const tabs = [
	{ tab: "Chats", Component: ChatContainer, Icon: Chat },
	{ tab: "Posts", Component: PostContainer, Icon: PostAdd },
	{ tab: "Music", Component: MusicContainer, Icon: MusicNote },
	{ tab: "Friends", Component: FriendContainer, Icon: People },
	{ tab: "Git", Component: GitContainer, Icon: GitHub },
	{ tab: "Profile", Component: ProfileContainer, Icon: AccountBox },
]

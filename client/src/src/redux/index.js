export * from "./user/actions"
export * from "./tab/actions"
export * from "./post/actions"
export * from "./friend/actions"
export * from "./chat/actions"
export * from "./profile/actions"
export * from "./music/actions"

const PORT = 3000
export const base = `http://localhost:${PORT}/api/`

export const routes = {
	users: {
		signup: "users/signup", //!r    POST  done
		login: "users/login", //!r    POST   done
		currentProfile: "users/profile", //!r    GET && PATCH  errror when done after created new one
		profileId: "users/profile/", //!r    GET
		dynamic: "users/search?q=", //!r    GET done but need for followers another route
		profilepic: "users/profile/profilepic", //!r POST done
	},
	posts: {
		create: "posts", //!r    POST
		postId: "posts/", //!r    GET  && PATCH && DELETE
		userId: "posts/user/", //!r    GET done
		allPosts: "posts/all/posts",
	},
	music: {
		currentPlaylist: "songs/albums", //!r    GET
		getSongsByPlaylist: "songs/", //!r    GET
		createPlaylist: "songs/albums/create", //!r    POST
		deletePlaylist: "songs/albums/delete/", //!r    DELETE
		createSong: "songs/create", //!r    GET
		deleteSong: "songs/delete", //!r    POST
	},
	friends: {
		followers: "friends/followers/",
		following: "friends/following/",
	},
}

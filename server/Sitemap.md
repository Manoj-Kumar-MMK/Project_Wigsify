//frontend 5000
//api backend 3000
//chats server 3300


/api
    ----> /users            
                
                /               (get all user names)
                /signup [post]  (json {name,password,email})   return {email,token,usrId}
                /login  [post]   (json {name, email})          return{email,token}
                /about/:userid  (get user info by userid)      
                
                /profile/:uid  [get all user info]
                
                [jwt token mandatory]

                /profile
                    / [get all info about the current logged in user]
                    / [patch]   //[you can update name ,FavLang,About , profession , mobile]
                    /profilepic [post]  ['profilepic':'imgdata']    update default profile profilepic

                /search?q=[ usernames ] dynamic searching


    -----> /posts
                
                /   [post ]
                /:pid
                /user/:uid
                /:pid [delete]
                /:pid [patch ]
                /all/posts        [get]

    ---------> /friends

                    --> /followers/:uid  [get all followers as an array for given uid]
                    --> /following/:uid  [get all following as an array for given uid]
                    
                    --> /followers/count/:uid [ get followers total_count ]
                    --> /following/count/:uid [get following total_count ]

                    ---> /isfollowing [post] { uid , fid }

                    [need jwt auth]


                    --> /follow  [post] {fid: friendid}  
                    --> /unfollow [post] {fid: friendid}



    --------> /songs
                    -->/:album_name         [get all songs for a given album name ]
                    -->/create     [post]   [create new song in that album]  [name , song ,singer,album_name]  
                    --->/delete    [delete]    send [song_name ,album_name]

                    --> /albums
                        ----> /             [get all album details for a user ]
                        -----> /create      [create new album ]    [name,image]
                        -----> /delete/:album_name      send[album_name]
 

    -------->socialmedia
                -----> /

    -----> /code
                /user/:uid
                /:code_id
                /search&q=[topic]

    
    ------> /hobby
                /interests/:userid
                /FavSongs/:userid
                /FavMovies/:uid
                /status/:uid

    ------> /chats
                {uid,fid}       [give the recent 100 msgs between uid and fid]
                
/uploads/images
/uploads/profile
/uploads/songs

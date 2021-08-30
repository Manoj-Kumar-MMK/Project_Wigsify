const dotenv = require('dotenv');

dotenv.config();


// create songs
const createSongs = (req,res,next)=>{

    const {album_name , name ,singer} = req.body ;

    // console.log(album_name , name ,singer)
    const userid = req.userData.id ;
    let sql = `select albumid from user_albums where album_name="${album_name}" and userid = "${userid}"`;

    db.query(sql,(error,results)=>{

        if(error) res.status(500).json({error:"something went wrong"});
        else if(!results[0]){
            console.group(results[0])
            res.status(400).json({error:`this ${album_name} album dont exists for you`})
        }
        else{
            let albumid =  results[0].albumid ;
            const songpath = `http://localhost:${process.env.PORT}/${req.file.path}`

            let sql = `insert into album_songs (albumid , song_name , song_url , singer) value ("${albumid}","${name}","${songpath}","${singer}")` ;

            db.query(sql,(error,results)=>{

                if(error) res.status(500).json({error:"something went wrong in creating songs"});
                else{
                   // console.log(results);
                    //song created
                    res.status(201).json({success:"song created"})
                }
            })

        }
    })
}


// get all songs for a given album name

const getSongs = (req,res,next)=>{

    const album_name = req.params.album_name

    // console.log(album_name , name ,singer)
    const userid = req.userData.id ;
    let sql = `select albumid from user_albums where album_name="${album_name}" and userid = "${userid}"`;

    db.query(sql,(error,results)=>{

        if(error) res.status(500).json({error:"something went wrong"});
        else if(!results[0]){
            res.status(400).json({error:`this ${album_name} album dont exists for you`})
        }
        else{
            let albumid =  results[0].albumid ;
          

            let sql = `select singer , song_name , song_url from album_songs where albumid = "${albumid}"` ;

            db.query(sql,(error,results)=>{

                if(error) res.status(500).json({error:"something went wrong in creating songs"});
                else{
                   // console.log(results);
                    //song created
                    res.status(200).json(results)
                }
            })

        }
    })

}

module.exports = {createSongs,getSongs };
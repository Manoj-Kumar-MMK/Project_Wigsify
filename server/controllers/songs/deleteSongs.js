const {validationResult} = require('express-validator');

const deleteSongs = (req,res,next)=>{


    const {song_name,album_name} = req.body;

    //validating the request
    const error = validationResult(req);
    if(!error.isEmpty()){
        //[name not in json req]
        return res.status(400).json({error:"invalid data"})
    }
    else{

        let sql = `delete from album_songs where song_name="${song_name}" and albumid = 
                        (select albumid from user_albums where album_name="${album_name}" 
                                and userid = "${req.userData.id}")` ;
        
        db.query(sql,(error,results)=>{
            if(error) res.status(500).json({error:"something went wrong"});
              // is sql executes correctly and deleted
            else if(results.affectedRows){
                
                res.status(200).json({msg:`successfully deleted song ${song_name}`})
            }
            else{
                res.status(400).json({error:"you cant delete this song"})
            }
        })

        
    }
}


module.exports = deleteSongs 
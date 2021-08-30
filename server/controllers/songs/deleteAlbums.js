
const {validationResult} = require('express-validator')

const deleteAlbums = (req,res,next)=>{

    const album_name = req.params.album_name ;

    //validating the request
    const error = validationResult(req);
    if(!error.isEmpty()){
        //[name not in json req]
        return res.status(400).json({error:"invalid data"})
    }
    else{

        // first deleting all songs belonging to that user album 
        let sql = `delete from album_songs where albumid = 
                        (select albumid from user_albums where album_name="${album_name}" 
                                and userid = "${req.userData.id}")` ;
        
        db.query(sql,(error,results)=>{
            if(error) res.status(500).json({error:"something went wrong"});
              // is sql executes correctly and deleted
            else{
               
                //deleting the entire album
                sql = `delete from user_albums where album_name = "${album_name}" and userid = "${req.userData.id}"`;

                db.query(sql,(error,results)=>{
                    if(error) res.status(500).json({error:"something went wrong"});
                    else if(results.affectedRows){
                        res.status(200).json({msg:"album deleted"});
                    }
                    else{
                        res.status(400).json({error:"you cant delete this album"});
                    }
                })
            }
        })

        
    }
}

module.exports = deleteAlbums ;


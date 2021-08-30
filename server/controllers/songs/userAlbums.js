const dotenv = require('dotenv');

const randStr = require('../utils/randomStr');
const {validationResult} = require('express-validator');

dotenv.config();

const getAlbums = (req,res,next)=>{

    let sql = `select * from user_albums where userid = "${req.userData.id}"`;

    db.query(sql,(error,results)=>{
        if(error) res.status(500).json({error:"something went wrong"});
        else{
            res.status(200).json(results)
        }
    })
}

const createAlbums = (req,res,next)=>{

    const {name} = req.body;

    //validating the request
    const error = validationResult(req);
    if(!error.isEmpty() || !req.file){
        //[name not in json req]
        return res.status(400).json({error:"invalid data"})
    }
    else{
        try{
            // checking if creator exists
        // console.log(req.userData.email)
            let sql = `select * from users where email="${req.userData.email}"` ;
            db.query(sql,(error,results)=>{

                results = results[0];

                //failed to executes sql query 
                if(error ) res.status(500).json({error:"something went wrong"});

                else if(!results){
                    const error = new httpError('creator id is wrong',400);
               
                    res.status(400).json(error) ;
                }
                else{
                    //getting posts data
                    const userid = results.id ;
                    console.log(userid,name)
                    let sql = `select * from user_albums where userid = "${userid}" and album_name = "${name}"`;

                    db.query(sql,(error,results)=>{

                        if(error) res.status(500).json({error:"couldnot create album post"})
                        else if(results[0]){
                            // if album name already exists for the given user
                            res.status(400).json({error:"the album name already exists"})
                        }
                        else{
                            //creating new album
                            const imgpath = `http://localhost:${process.env.PORT}/${req.file.path}`;
                            const random_albumid = randStr();

                            sql = `insert into user_albums(album_name,albumid,album_photo_url,userid) values("${name}","${random_albumid}","${imgpath}","${userid}")`
                            //inserting posts data into db 
        
                            db.query(sql,(error,results)=>{
                                if(error) res.status(500).json({error:"couldnot create album"})
                                else{
        
                                    res.status(201);
        
                                    res.json({name:name,userid:userid,imgpath:imgpath,albumid:random_albumid});
                                }
                            }) 

                        }

                    })
                      
            }
            })
        
        }
        catch(error){
            return next(error) ;
        }
    }
}

module.exports = {

    getAlbums,
    createAlbums

}
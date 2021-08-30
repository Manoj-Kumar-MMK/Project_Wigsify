const {validationResult} = require('express-validator');
const dotenv = require('dotenv');

const httpError = require('../../Models/http-error')

dotenv.config();

// [/api/users/profile] (patch)
const userProfileUpdate = (req,res,next)=>{

    //validating the request
    const error = validationResult(req);
    const {name,About,FavLang,profession,mobile} = req.body;
    console.log(name,About,FavLang,profession,mobile)
    if(!error.isEmpty()){
        //given data is not img type
        return res.status(400).json({error:"invalid data"})
    }
    else{
        try{
            // checking if user exists
        // console.log(req.userData.email)
            let sql = `select * from users where email="${req.userData.email}"` ;
            db.query(sql,(error,results)=>{

                results = results[0];

                //failed to executes sql query 
                if(error) res.status(500).json({error:"something went wrong"});

                else if(!results){
                    const error = new httpError('creator id is wrong',400);
               
                    res.status(400).json(error) ;
                }
                else{
                    const userid = results.id ;
                    sql = `update users set name="${name}",About="${About}",FavLang="${FavLang}",profession="${profession}",mobile="${mobile}" where id = "${userid}"`
                    
                    //updating profile data into db 

                    db.query(sql,(error,results)=>{
                        if(error) res.status(400).json({error:"couldnot update profile"})
                        else{

                            res.status(201);
                            res.json({id:userid});
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

//profilepic upload route
//  [/api/users/profile/profilepic]
const userProfilePicUpload = (req,res,next)=>{

    //validating the request
    const error = validationResult(req);
    
    //console.log("hiiiii ");

    if(!error.isEmpty() || !req.file){
        //given data is not img type
        return res.status(400).json({error:"invalid data"})
    }
    else{
        try{
            // checking if user exists
        // console.log(req.userData.email)
            let sql = `select * from users where email="${req.userData.email}"` ;
            db.query(sql,(error,results)=>{

                results = results[0];

                //failed to executes sql query 
                if(error) res.status(500).json({error:"something went wrong"});

                else if(!results){
                    const error = new httpError('creator id is wrong',400);
               
                    res.status(400).json(error) ;
                }
                else{
                    //getting posts data
                    const userid = results.id ;
                    const imgpath = `http://localhost:${process.env.PORT}/${req.file.path}`
                    sql = `update users set profile_pic_path="${imgpath}" where id = "${userid}"`
                    
                    //inserting posts data into db 

                    db.query(sql,(error,results)=>{
                        if(error) res.status(400).json({error:"couldnot upload pic"})
                        else{

                            res.status(201);
                            res.json({id:userid,profilePath:imgpath});
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

const dummy = (req,res,next) => res.status(200).json({msg:"got it"})

module.exports = {userProfilePicUpload , dummy ,userProfileUpdate}
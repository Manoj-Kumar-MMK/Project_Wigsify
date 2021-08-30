const {validationResult} = require('express-validator');
const httpError = require('../../Models/http-error')
const dotenv = require('dotenv');

dotenv.config();


const errorHandler = (msg,code)=>{

    let error = {error:msg};
    error.code = code ;
    return error

}
// [ /api/posts ]

//handling get request
const getpostsById =async (req,res,next)=>{
    let postsId = req.params.pid ;

    let sql = `select * from posts where postid=${postsId}`;

    db.query(sql,(error,results)=>{

        if(error ) res.status(500).json({error:"something went wrong"})
        else if(!results[0]) res.status(404).json({message:"posts not found"})
        else{
            res.status(200).json(results)
        }
    })
   

}

const getpostsByCreatorId =(req,res,next)=>{

    let userId = req.params.uid ;
    console.log(userId)
    //returning the response
    let sql = `select * from posts where userid=${userId}`;
    
    db.query(sql,(error,results)=>{

        if(error ) res.status(500).json({error:"something went wrong"})
        else if(!results) res.status(404).json({message:"posts not found"})
        else{
            res.status(200).json(results)
        }
    })

}

// handling post request

// [ Creating posts ]
const createposts = async (req,res,next)=>{

    const {name,description} = req.body;

    //validating the request
    const error = validationResult(req);
    if(!error.isEmpty() || !req.file ){
        //[name , descrition not in json req]
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
                if(error) res.status(500).json({error:"something went wrong"});

                else if(!results){
                    const error = new httpError('creator id is wrong',400);
               
                    res.status(400).json(error) ;
                }
                else{
                    //getting posts data
                    const userid = results.id ;
                    const imgpath = `http://localhost:${process.env.PORT}/${req.file.path}`
                    sql = `insert into posts(name,description,imgpath,userid) values("${name}","${description}","${imgpath}","${userid}")`
                    
                    //inserting posts data into db 

                    db.query(sql,(error,results)=>{
                        if(error) res.status(400).json({error:"couldnot create post"})
                        else{

                            res.status(201);

                            res.json({name:name,userid:userid,imgpath:imgpath,description:description});
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

const updateposts =async (req,res,next)=>{
    const {name,description} = req.body;
    const postsId = req.params.pid;

  
    //validating request
    const error = validationResult(req);
    if(!error.isEmpty()){
      
        return res.status(400).json({error:"invalid data"});

    }
    else{
        let sql = `select * from posts where postid="${postsId}" and userid="${req.userData.id}"`;
    
        db.query(sql,(error,results)=>{

        
            // results is raw data . our post info is available at index 0
            if(results) results = results[0] ;

            //sql query fails
            if(error) res.status(500).json({error:"something went wrong here "});
            //if post data can be updated by current user
            else if(results){
                console.log(results);
                sql = `update posts set name= "${name}",description="${description}" where postid="${postsId}" `
                
                db.query(sql,(error,results)=>{
                    if(results) res.status(201).json({message:"posts updated"});
                    else       res.status(400).json({error:"posts updated failed"});
                });

                
            }
            //the post doesnt belong to the current user
            else{

                res.status(401).json({message:"you cant update this posts"})
            }

            
        });

    
    }
}

const deleteposts = async (req,res,next)=>{

    const postsId = req.params.pid;

    let sql = `select * from posts where postid="${postsId}" and userid="${req.userData.id}"`;

    db.query(sql,(error,results)=>{
        if(error) res.status(500).json({error:"something went wrong"});
        //checking if the user is the owner of the post and post available
        else if(results[0]){
            // console.log("hi      ",results[0]);

            sql = `delete from posts where postid="${postsId}" `
            db.query(sql,(error,results)=>{
                // console.log(results.affectedRows,"     hii");

                // is sql executes correctly and deleted
                if(results.affectedRows) 
                    {
                        res.status(201).json({message:"posts ---- deleted"});
                    }
                else{
                     res.status(400).json({error:"posts deletion failed"});
                }
            });

        }
        //if user is not the owner of the posts and psot not available
        else{

            res.status(401).json({message:"you cant delete this posts"})
        }

        
    });

}

module.exports = {
    getpostsByCreatorId,
    getpostsById,
    createposts,
    updateposts,
    deleteposts
}
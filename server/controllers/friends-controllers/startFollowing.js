const {validationResult} = require('express-validator')

const startFollowing = (req,res,next)=>{


    const {fid} = req.body;

    //validating the request if fid is available
    const error = validationResult(req);
    if(!error.isEmpty()){
        //[name , descrition not in json req]
        return res.status(400).json({error:"invalid data"})
    }

    else{
        try{
            // checking if current user exists
       
            let sql = `select * from users where email="${req.userData.email}"` ;
            db.query(sql,(error,results)=>{

                results = results[0];

                //failed to executes sql query 
                if(error) res.status(500).json({error:"something went wrong"});

                else if(!results){
                    //if the user doesnt found
                    const error = new httpError('creator id is wrong',400);
               
                    res.status(400).json(error) ;
                }
                else if(results.id === fid){
                    //if user tries to follow himself
                    res.status(400).json({error:"you cant follow yourself"})

                }
                else{
                    const userid = results.id ;
                    sql = `select * from friends where uid="${userid}" and follow="${fid}"`;
                    
                    //checking if user already followed the given user
                    db.query(sql,(error,results)=>{
                        if(error) res.status(500).json({error:"something went wrong"});

                        else if(results[0]) {
                            res.status(400).json({error:"you have already followed this user"});
                        }
                        else{
                                 // userid follows fid 
                            sql = `insert into friends (uid,follow) values("${userid}","${fid}")`

                            db.query(sql,(error,results)=>{
                                if(error) res.status(400).json({error:"couldnot follow the user"})
                                else{

                                    res.status(201);
                                    res.json({uid:userid , fid,fid});
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


module.exports = startFollowing ;


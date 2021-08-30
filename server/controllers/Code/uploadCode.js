const {validationResult} = require('express-validator') ;


const uploadCode = (req,res,next)=>{

    const error = validationResult(req);

    const{name} = req.body
    if(!error.isEmpty()){
      
        return res.status(400).json({error:"invalid data"})
    }
    else{

        console.log(req.file.path , name)
               // checking if creator exists
        // console.log(req.userData.email)
        let sql = `select * from users where email="${req.userData.email}"` ;
        db.query(sql,(error,results)=>{

            results = results[0];

            //failed to executes sql query 
            if(error || !req.file ) res.status(500).json({error:"something went wrong"});

            else if(!results){
                const error = new httpError('creator id is wrong',400);
           
                res.status(400).json(error) ;
            }
            else{
                //getting posts data
                const userid = results.id ;
                console.log(userid,name)
                let sql = `select * from code where userid = "${userid}" and name = "${name}"`;

                db.query(sql,(error,results)=>{

                    if(error) res.status(500).json({error:"couldnot create code post"})
                    else if(results[0]){
                        // if code name already exists for the given user
                        res.status(400).json({error:"the code repository already exists"})
                    }
                    else{
                        //creating new code
                        const codepath = `http://localhost:${process.env.PORT}/${req.file.path}`;

                        sql = `insert into code(name,userid,code_url) values("${name}","${userid}","${codepath}")`
                        //inserting posts data into db 
    
                        db.query(sql,(error,results)=>{
                            if(error) res.status(500).json({error:"couldnot create repo"})
                            else{
    
                                res.status(201);
    
                                res.json({codepath:codepath , name:name});
                            }
                        })        
                    }

                })
                  
        }
        })
    
    }


}

module.exports = {uploadCode}
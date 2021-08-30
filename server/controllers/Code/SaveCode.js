const {validationResult} = require('express-validator') ;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const ranStr = require('../utils/randomStr');

dotenv.config();

const saveCode = (req,res,next)=>{

      //validating the request
      const error = validationResult(req);

      const{name , code} = req.body
      if(!error.isEmpty()){
        
          return res.status(400).json({error:"invalid data"})
      }
      else{

       let sql = `select *  from code where name = "${name}" and userid = "${req.userData.id}"`;
        
       db.query(sql,(error,results)=>{

        if(error) res.status(500).json({error:"something went wrong"})
        else if(results[0]) res.status(400).json({error:"name already exists"});
        else{

            let code_rand_name = ranStr();
            code_url = `http://localhost:${process.env.PORT}/uploads/code/${code_rand_name}` ;

            fs.writeFile( path.join('uploads','code',code_rand_name), code , (err)=>{

                if(err) res.status(400).json({error:"something went wrong"});
                else{
                    console.log(req.userData.id);

                    let sql = `insert into code (name , userid , code_url) values("${name}","${req.userData.id}","${code_url}") ` ;

                    db.query(sql,(error,results)=>{

                        if(error) res.status(500).json({error:"something went wrong"});
        
                        else{
                            res.status(201).json({msg:"created"});
        
                        }
                    })
                }
            })
            
        }
       })

      }


}


module.exports = {saveCode}
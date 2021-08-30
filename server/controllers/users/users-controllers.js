const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const httpError = require('../../Models/http-error');
const  execSql = require('../../db/execSql');
dotenv.config();

//getusersname
//[ /api/users/ ]

// return all users name 
const getUsers =async (req,res,next)=>{


    sql = "select name from users";
    execSql(next,sql,(next,err,results)=>{
        if(err) next(err) ;
        else res.send(results) ;
    })

}

// return user info by userid [ /about/:userid ]
const getUserInfo =async (req,res,next)=>{
    let userid = req.params.userid ;
    sql = `select id,name,About,FavLang,email ,mobile,profession from users where id = "${userid}"`

    db.query(sql,(error,results)=>{
        
        //if sql execution failed
        if(error){
            res.status(500).json({error:"something went wrong"}) ;
        } 

        //if user doesnot exists 
        else if(!results[0]){
             res.status(404).json({error:"user not found"});
        }
        // if user found
        else res.status(200).json(results);
    })
}

//handling post request

// [  /api/users/signup  ]
const userSignUp =async (req,res,next)=>{
    const {name,email,password} = req.body;

    //validating user input 
    const error = validationResult(req);
    if(!error.isEmpty()){
        const error = new httpError('enter valid data',422)
        console.log(req.body)      
        return next(error);
    }

    //sql query for testing if email already exists
    let sql = `select id from users where email = "${email}"`;
    execSql(next,sql,async (next,error,identifyUserExists)=>{
        if(error) next(error) ;

        if(identifyUserExists){
            let error = {msg:"email already exists",code:400}
            
            res.status(400).json(error);
        }
        else{
            
                // hashing the password using bcrypt
                let hashedPassword
                try{
                    hashedPassword = await bcrypt.hash(password,12)
                }catch(err){
                    let error = new Error('failed to register user');
                    error.code = 400
                    return next(error)
                }
        
        
                //sql insertion for new user
                sql = `insert into users(name,password,email) values ("${name}","${hashedPassword}","${email}")`
        
                execSql(next,sql,(next,error,results)=>{
                    if(error) next(error) ; 
        
                    //console.log(results);
        
                })
                
                //getting the userid for signing jwt token

                sql = `select * from users where email="${email}"`;
             //   console.log(sql);
                execSql(next,sql,(next,error,results)=>{
        
                    if(error) next(error) ;
                    console.log("giiii")
                    //generating jwt token
                    console.log(results)
                    let token
                    try{
                        token = jwt.sign({email:email,id:results.id},process.env.JWT_SECRETKEY,{expiresIn:'21h'})
                        
                        
                        res
                        .status(201)
                        .json({email:email,token:token,userid:results.id});
        
                    }
                    catch(err){
                        const error = new httpError('try again later',400)
                        return next(error)
                    }
                })
            }
    })

}

// [  /api/users/login ]
const userLogIn = async (req,res,next)=>{

    const {email , password} = req.body
        //validating user input 
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log("hiiii")
        const error = new httpError('invalid credentials',401)
        return next(error)
    }
   
  let sql =`select * from users where email="${email}"`
  
  db.query(sql,async (error,identifyUser)=>{

      //sql query failed to executes
        if(error) {
            console.log(error);
            res.status(500).json({error:"something went wrong"})
        } 
        //console.log(identifyUser)

        //if sql query executes correctly
        else if(identifyUser){
            let isPasswordValid = false;
            identifyUser = identifyUser[0];

            //if the email exists then check for the password by decrypting it

            if(identifyUser){
                try{
                    isPasswordValid= await bcrypt.compare(password,identifyUser.password)

                                //decoding the password and comparing

                    if(!identifyUser || !isPasswordValid){
                        //password check fails
                        res.status(400).json({error:"invalid credientials"});
                    }
                    else{
                        //[password checks success]
                        //generating jwt token
                        let token
                        try{
                            token = jwt.sign({email:email,id:identifyUser.id},process.env.JWT_SECRETKEY,{expiresIn:'21h'})
                        }
                        catch(err){
                            const error = new httpError('try again later',400)
                            return next(error)
                        }
                    
                        res
                        .status(200)
                        .json({email:email,userid:identifyUser.id,token:token});
                    }
                

                }
                catch(err){

                    let error = new Error('failed to login user');
                    error.code = 400
                    res.status(400).json(error)
                }
            }

            else{
                //if email check fails to execute
                res.status(400).json({error:"invalid credientials email"});

            }

        }
       
     
  
      
  })
 
}

module.exports = {
    getUsers,
    userSignUp,
    userLogIn,
    getUserInfo
}

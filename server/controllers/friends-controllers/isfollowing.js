const { validationResult } = require('express-validator');

const isFollowing = (req,res,next)=>{
    const {uid,fid} = req.body ;
    
    console.log(uid,fid)
    //validating the request if fid is available
    const error = validationResult(req);
    if(!error.isEmpty()){
      //[name , descrition not in json req]
        return res.status(400).json({error:"invalid data"})
        }
    
    else{

        let sql = `select * from friends where follow = "${fid}" and uid=${uid}`;

        db.query(sql,(error,results)=>{

            if(error)  res.status(500).json({error:"something went wrong"});
            else if(results[0]){

                res.status(200).json({isFollowing:true})
            }
            else{
                res.status(200).json({isFollowing:false});
            }
               
        })

    }

}


module.exports = {
    isFollowing
}
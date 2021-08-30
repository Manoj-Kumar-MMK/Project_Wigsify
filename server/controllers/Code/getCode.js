

const getCode = (req,res,next)=>{

    let userId = req.params.userid ;
    console.log(userId)
    //returning the response
    let sql = `select * from code where userid=${userId}`;
    
    db.query(sql,(error,results)=>{

        if(error ) res.status(500).json({error:"something went wrong"})
        else if(!results) res.status(404).json({message:"posts not found"})
        else{
            res.status(200).json(results)
        }
    })


};

module.exports = getCode ;
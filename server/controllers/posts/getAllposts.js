

const LIMIT = 30 ;

const getAllPosts = (req,res,next)=>{


    let sql = `select * from posts limit ${LIMIT}`;
    
    db.query(sql,(error,results)=>{

        if(error ) res.status(500).json({error:"something went wrong gg"});
        else if(!results) res.status(404).json({message:"posts not found"});
        else{

            res.status(200).json(results)

        }

    })

}


module.exports = {
    getAllPosts
}
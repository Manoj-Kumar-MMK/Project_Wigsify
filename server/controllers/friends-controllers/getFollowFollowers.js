

const getFollowersDynamic = (req,res,next)=>{

    const query = req.query.q ;

    if(query){
        //using regex to match all username for given query
        let sql = `select name,id,email,FavLang,About,profession,mobile from users 
                        where id in (select follow from friends where uid in
                            (select id from users where name REGEXP "^${query}.*"))` ;
                        
         sql = `select id from users where name REGEXP "^${query}.*"`;

        db.query(sql,(error,results)=>{
            
            if(error)   res.status(500).json({error:"something went wrong"});
            else{
                
                res.status(200).json(results)
            }
        })
    }
    else{
        res.status(200).json([])
    }


}

const getFollowingDynamic = (req,res,next)=>{


}

module.exports = {

    getFollowersDynamic,
    getFollowingDynamic

}
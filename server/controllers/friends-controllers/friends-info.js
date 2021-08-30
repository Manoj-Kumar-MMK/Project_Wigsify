

const getFollowersCount = (req,res,next)=>{
    const  uid = req.params.uid ;

    if(uid){

        let sql = `select count(uid) from friends where follow = "${uid}"`;

        db.query(sql,(error,results)=>{
            if(results[0]){

                let total_count = results[0]['count(uid)'] ;
                res.status(200).json({
                    total_count
                })
            }
            else{
                res.status(400).json({error:"something went wrong"});
            }
               
        })

    }
    else{
        res.status(500).json({error:"something went wrong"})
    }

}

const getFollowingCount = (req,res,next)=>{

    const  uid = req.params.uid ;

    if(uid){

        let sql = `select count(follow) from friends where uid = "${uid}"`;

        db.query(sql,(error,results)=>{
            if(results[0]){

                let total_following = results[0]['count(follow)'] ;
                res.status(200).json({
                    total_count
                })
            }
            else{
                res.status(400).json({error:"something went wrong"});
            }

        })

    }
    else{
        res.status(500).json({error:"something went wrong"})
    }

}

const getFollowers = (req,res,next)=>{
    const  uid = req.params.uid ;

    if(uid){

        let sql = `select id , name , email ,FavLang , About , profession , mobile , profile_pic_path from users 
                     where id in 
                     (select uid from friends where follow = "${uid}" )` ;
       

        db.query(sql,(error,results)=>{

            if (results){
                res.status(200).json(results)
            }
            else{
                res.status(400).json({error:"something went wrong"});
            }

               
        })

    }
    else{
        res.status(500).json({error:"something went wrong"})
    }

}

const getFollowing = (req,res,next)=>{

    const  uid = req.params.uid ;

    if(uid){

        let sql = `select id , name , email ,FavLang , About , profession , mobile , profile_pic_path from users 
                    where id in 
                    (select follow as uid from friends where uid = "${uid}" )`;

        db.query(sql,(error,results)=>{
             if (results){
                
                res.status(200).json(results);
               
            }
            else{

                res.status(400).json({
                    error:"something went wrong"
                })

            }

        })

    }
    else{
        res.status(500).json({error:"something went wrong"})
    }

}

module.exports = {
    getFollowersCount,
    getFollowingCount,
    getFollowing,
    getFollowers
}
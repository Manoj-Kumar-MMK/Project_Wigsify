
const getUserAllInfo = (req,res,next)=>{

    let userid = req.params.uid ;
    sql = `select id,name,About,FavLang,email ,mobile,profession,profile_pic_path from users where id = "${userid}"`

    let allInfo ; 

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
        else {

            allInfo = results[0]
            
            let sql = `select count(uid) from friends where follow = "${userid}"`;

            db.query(sql,(error,results)=>{
                if(results[0]){

                    allInfo.followers = results[0]['count(uid)'] ;

                    let sql = `select count(follow) from friends where uid = "${userid}"`;

                    db.query(sql,(error,results)=>{
                        if(results[0]){
            
                            allInfo.following = results[0]['count(follow)'] ;
                            
                            //console.log(allInfo)
                            let sql =` select count(postid) from posts where userid="${userid}" ` ;

                            db.query(sql,(error,results)=>{
                                if(results[0]){
                                    allInfo.no_of_posts = results[0]['count(postid)'];

                                    res.status(200).json(allInfo)
                                }
                                else{

                                    res.status(400).json({error:"something went wrong"});
                                }
                            });

                        }
                        else{
                            res.status(400).json({error:"something went wrong"});
                        }
            
                    })
                    
                }
                else{
                    res.status(400).json({error:"something went wrong"});
                }
                
            })
            
        }
    });



}


const getCurrentUserAllInfo = (req,res,next)=>{

    let userid = req.userData.id ;

    sql = `select id,name,About,FavLang,email ,mobile,profession,profile_pic_path from users where id = "${userid}"`

    let allInfo ; 

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
        else {

            allInfo = results[0]
            
            let sql = `select count(uid) from friends where follow = "${userid}"`;

            db.query(sql,(error,results)=>{
                if(results[0]){

                    allInfo.followers = results[0]['count(uid)'] ;

                    let sql = `select count(follow) from friends where uid = "${userid}"`;

                    db.query(sql,(error,results)=>{
                        if(results[0]){
            
                            allInfo.following = results[0]['count(follow)'] ;
                            
                            let sql =` select count(postid) from posts where userid="${userid}" ` ;

                            db.query(sql,(error,results)=>{
                                if(results[0]){
                                    allInfo.no_of_posts = results[0]['count(postid)'];

                                    res.status(200).json(allInfo)
                                }
                                else{

                                    res.status(400).json({error:"something went wrong"});
                                }
                            });
                            
                        }
                        else{
                            res.status(400).json({error:"something went wrong"});
                        }
            
                    })
                    
                }
                else{
                    res.status(400).json({error:"something went wrong"});
                }
                
            })
            
        }
    });



}


module.exports ={ getUserAllInfo,getCurrentUserAllInfo }
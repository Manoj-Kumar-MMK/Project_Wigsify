const {validationResult} = require('express-validator');

//default no of chats to return

let NO_OF_CHATS = 50 ;

const getChats = (req,res,next)=>{

       //validating the request
       const error = validationResult(req);
       const {fid , uid} = req.body;
   
       if(!error.isEmpty()){
           // friend id is not given
           return res.status(400).json({error:"friend id not given"})
       }
       else{
          let myid = uid;
        //  myid = 2 ;
          let sql = `select chats_table_name from chats_entry where(chats_entry.aid ="${myid}" and chats_entry.bid = "${fid}") or (chats_entry.aid = "${fid}" and chats_entry.bid = "${myid}")` ;

          db.query(sql,(error,results)=>{
            //if sql execution fails
            if(error){

               res.status(500).json({error:"something went wrong"})

            }
            // if the user already chats with fid
            else if(results[0]){
              let chats_table_name = results[0].chats_table_name ;
              //getting the chats from table
              sql = `select * from ( select senderid as username,msg,timestamp,users.name from ${chats_table_name} , users where senderid = users.id order by timestamp desc limit ${NO_OF_CHATS})var2 order by timestamp asc` ;

              db.query(sql,(error,results)=>{

                if(error) res.status(500).json({error:"something went wrong"}) ;

                else{
                    
                  
                    res.status(200).json(results);
                }

              })

            }
            else{
              // first time the user chatting with fid
                res.status(200).json([])
              
            }
          })

        }
}

module.exports = getChats
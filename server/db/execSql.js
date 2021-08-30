
const execSql = (next,sql,callback)=>{

    db.query(sql,(error,results)=>{

        if(error) callback(next,error,null)
        else{
          let rows  ;

          if(results[0]){
            rows = {}
            Object.keys(results).forEach(function(key) {
              rows[key] = results[key];
            });
            //console.log(results)
            callback(next,null,rows);
          } 
          //converting the rowdatapackts into propr usable objects

          callback(next,null,rows)
          
          //callback(null,results)
        }
    })

  }

module.exports = execSql ;

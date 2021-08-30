const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyparser =require('body-parser');
const path = require('path');

//USER MODULES
const getUsers = require('./test');
const db_connect = require('./db/dbObj');
const UserRoutes = require('./Routes/UserRouter');
const PostsRoutes = require('./Routes/PostsRouter');
const ChatsRoutes = require('./Routes/ChatsRouter');
const FriendsRoutes = require('./Routes/FriendsRouter');
const codeRouter = require('./Routes/CodeRouter');
const handleDisconnect = require('./db/handleDisconnect');
const SongsRouter = require('./Routes/SongsRouter');

// config file [.env ]
dotenv.config();
const app = express();

// MIDDLEWARES FOR CORS AND REQ BODY PARSING
app.use(bodyparser.json());
app.use((req,res,next)=>{

    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',  
                                    'Accept,Content-Type,X-Requested-With,Origin,Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');

    next()
})

//REST API
app.use('/api/users',UserRoutes);
app.use('/api/posts',PostsRoutes);
app.use('/api/friends',FriendsRoutes);
app.use('/api/songs',SongsRouter);
app.use('/api/chats',ChatsRoutes);
app.use('/api/code',codeRouter);

// static images hadling
app.use('/uploads/images',express.static(path.join('uploads','images')));
app.use('/uploads/profiles',express.static(path.join('uploads','profiles')));
app.use('/uploads/songs',express.static(path.join('uploads','songs')));
app.use('/uploads/albums',express.static(path.join('uploads','albums')));
app.use('/uploads/code',express.static(path.join('uploads','code')));


//testing route
//app.get('/getusers',getUsers)

//error handling
app.use((req,res,next)=>{
    const error = new Error('could not find this route')
    error.code = 400
    next(error)
})

app.use((error,req,res,next)=>{
    if(req.file){
        fs.unlink(req.file.path,error =>{
            console.log(error)
        })
    }
    if(res.headerSent){
        return next(error)
    }
    res.status( error.code || 500 );
    res.json({message:error.message || 'something went wrong'})
})



// connecting to the database and then starting the server
global.db = mysql.createConnection(db_connect);
db.connect(function(err) {

    if (err) throw err;
    // starting the server
  app.listen(process.env.PORT || 3000,()=>{

    console.log(`Server Started ==> ${process.env.PORT || 3000}`); 

    })

    console.log("DB Connected!");

});

// auto reconnection if mysql connection lost
handleDisconnect();


const express = require('express');
const {check} = require('express-validator')

const verifyJWT = require('../middlewares/verify-jwt');
const getChats = require('../controllers/chats/chats-controller');

const ChatsRouter = express.Router();


//ChatsRouter.use(verifyJWT);

/*[userid will be taken from jwt need to post {
    friend id and no of messages
}] */
ChatsRouter.post('/',
    [check('fid').not().isEmpty(),
    check('uid').not().isEmpty()],
    getChats)


module.exports = ChatsRouter ;
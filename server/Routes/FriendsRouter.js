const express = require('express');
const {check} = require('express-validator')

const verifyJWT = require('../middlewares/verify-jwt');
const startFollowing = require('../controllers/friends-controllers/startFollowing');
const startUnfollowing = require('../controllers/friends-controllers/startUnfollow');
const {getFollowersCount,getFollowingCount,getFollowers,getFollowing} = require('../controllers/friends-controllers/friends-info');

const {getFollowersDynamic , getFollowingDynamic} = require('../controllers/friends-controllers/getFollowFollowers');

const {isFollowing} = require('../controllers/friends-controllers/isfollowing');

const ChatsRouter = express.Router();


// routes return follower and following for a particular user

// get an array of followers and followinfg user id
ChatsRouter.get('/followers/:uid',getFollowers);
ChatsRouter.get('/following/:uid',getFollowing);

ChatsRouter.get('/followers/count/:uid',getFollowersCount);
ChatsRouter.get('/following/count/:uid',getFollowingCount);

ChatsRouter.post('/isfollowing', 
        [check('fid').not().isEmpty(),
        check('uid').not().isEmpty()],
        isFollowing) ;

//[ user must be signed in to follow others ]
ChatsRouter.use(verifyJWT);

ChatsRouter.post('/follow',
    [check('fid').not().isEmpty()],
        startFollowing)

ChatsRouter.post('/unfollow',[
    check('fid').not().isEmpty()],
        startUnfollowing);


// ChatsRouter.get('/getFollowers',getFollowersDynamic);
// ChatsRouter.get('/getFollowing',getFollowingDynamic);




module.exports = ChatsRouter ;
const express = require('express');
const {check} = require('express-validator')
const { userSignUp, 
    userLogIn ,
    getUsers,
    getUserInfo } = require('../controllers/users/users-controllers.js');

const {userProfilePicUpload , dummy ,userProfileUpdate }= require('../controllers/users/users-profile-controllers');

const {getCurrentUserAllInfo , getUserAllInfo} = require('../controllers/users/profile-allinfo-user');
const dynamicSearchUser = require('../controllers/users/users-dynamic-search');

const verifyJWT = require('../middlewares/verify-jwt')
const ProfileUploader = require('../middlewares/ProfileUploader');

const UserRoutes = express.Router()

// [ HANDLES ======> /api/users ]

UserRoutes.get('/',getUsers)
UserRoutes.get('/about/:userid',getUserInfo)

UserRoutes.post('/signup',
    [
    check('name').not().isEmpty(),
    check('password').isLength({min:5}),
    check('email').isEmail()
],userSignUp)

UserRoutes.post('/login',[
    check('password').isLength({min:5}),
    check('email').isEmail()
],userLogIn)

UserRoutes.get('/profile/:uid',getUserAllInfo)

UserRoutes.get('/search',dynamicSearchUser)
//need jwt token to access the below routes
UserRoutes.use(verifyJWT);

// get current user all info
UserRoutes.get('/profile',getCurrentUserAllInfo)

// user profile update
UserRoutes.patch('/profile',[
    check('name').not().isEmpty(),
    check('About').not().isEmpty(),
    check('FavLang').not().isEmpty(),
    check('mobile').not().isEmpty(),
    check('profession').not().isEmpty()
],userProfileUpdate);


//uploading profile pic
UserRoutes.post('/profile/profilepic',
                ProfileUploader.single('profilepic'),
                userProfilePicUpload
                )


module.exports = UserRoutes ;
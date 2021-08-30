const express = require('express')
const {check} = require('express-validator');
const imageUploader = require('../middlewares/ImageUploader')
const verifyJWT = require('../middlewares/verify-jwt')
const {getAllPosts} = require('../controllers/posts/getAllposts');

const  {
    getpostsByCreatorId,
    getpostsById,
    createposts,
    updateposts,
    deleteposts
} = require('../controllers/posts/posts-controllers')


const postsrouter = express.Router()

postsrouter.get('/:pid',getpostsById);
postsrouter.get('/user/:uid',getpostsByCreatorId);
postsrouter.get('/all/posts',getAllPosts);
postsrouter.use(verifyJWT)

postsrouter.post('/',
    imageUploader.single('image'),[
    check('name').not().isEmpty(),
    check('description').isLength({min:5})
],createposts);

postsrouter.patch('/:pid',[
    check('name').not().isEmpty(),
    check('description').isLength({min:5})
],updateposts);

postsrouter.delete('/:pid',deleteposts)
module.exports = postsrouter ;
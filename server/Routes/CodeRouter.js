const express = require('express');
const {check} = require('express-validator')

const verifyJWT = require('../middlewares/verify-jwt');
const {saveCode} = require('../controllers/Code/SaveCode');
const { uploadCode } = require('../controllers/Code/uploadCode');
const codeUploader = require('../middlewares/CodeUploader');
const getCode = require('../controllers/Code/getCode');

const codeRouter = express.Router();

codeRouter.get('/:userid',getCode);

codeRouter.use(verifyJWT);

codeRouter.post('/', [
    check('name').not().isEmpty(),
    check('code').isLength()
],saveCode);

codeRouter.post('/uploads',
    codeUploader.single('code')
    ,[
    check('name').not().isEmpty() 
],uploadCode)


module.exports = codeRouter ;
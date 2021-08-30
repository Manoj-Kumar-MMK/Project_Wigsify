const express = require('express');
const {check} = require('express-validator');

const albumUploader = require('../middlewares/AlbumUploader')
const verifyJWT = require('../middlewares/verify-jwt');

const {createAlbums,getAlbums} = require('../controllers/songs/userAlbums');
const songsUploader = require('../middlewares/SongsUploader');
const {createSongs , getSongs} = require('../controllers/songs/userSongs');
const deleteSongs = require('../controllers/songs/deleteSongs');
const deleteAlbums = require('../controllers/songs/deleteAlbums');

const SongsRouter = express.Router();

SongsRouter.use(verifyJWT);

//              [ ALBUMS ]
//create new album
SongsRouter.post('/albums/create', albumUploader.single('image'),
[
    check('name').not().isEmpty()
],createAlbums);

//get all album for a current user
SongsRouter.get('/albums',getAlbums);

//create songs in a album
SongsRouter.post('/create',songsUploader.single('song'),
[
    check('name').not().isEmpty(),
    check('singer').not().isEmpty(),
    check('album_name').not().isEmpty()
],createSongs);

SongsRouter.delete('/albums/delete/:album_name',deleteAlbums);

//              [SONGS]

// get all songs for an album          
SongsRouter.get('/:album_name',getSongs);

SongsRouter.post('/delete',[

    check('song_name').not().isEmpty(),
    check('album_name').not().isEmpty()

],deleteSongs);

module.exports = SongsRouter ;
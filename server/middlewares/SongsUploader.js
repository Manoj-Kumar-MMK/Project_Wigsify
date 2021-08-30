const multer = require('multer')
const uuid = require('uuid')

const MIME_TYPES = {
    'audio/mpeg':'mp3',
    'audio/x-mpeg-3':'mp3',
    'audio/mpeg3':'mp3',
    'audio/x-mpeg':'mp3'
}

const randomName = ()=>{
    return String(Math.floor(Math.random()*100000000))
}
const songsUploader = multer({

    limits:500000,
    storage:multer.diskStorage({
        filename:(req,file,cb)=>{

            const Name = randomName()
            const extension = MIME_TYPES[file.mimetype]
            //console.log(extension)
            cb(null,Name+'.'+extension)

        },
        destination:(req,file,cb)=>{
            cb(null,'uploads/songs')
        }
    }),
    fileFilter:(req,file,cb)=>{
        const isValid = !!MIME_TYPES[file.mimetype]
        const error = isValid ?null: new Error('invalid mime type')
       // console.log(error)
        cb(error,isValid)
    }

})


module.exports = songsUploader
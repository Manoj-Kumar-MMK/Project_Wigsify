const multer = require('multer')
const uuid = require('uuid')

const randomName = ()=>{
    return String(Math.floor(Math.random()*100000000))
}
const codeUploader = multer({

    limits:500000,
    storage:multer.diskStorage({
        filename:(req,file,cb)=>{

            const Name = randomName()
            // const extension = '.txt'
            // console.log(extension)
            cb(null,Name)

        },
        destination:(req,file,cb)=>{
            cb(null,'uploads/code')
        }
    }),
    fileFilter:(req,file,cb)=>{
        const isValid = true ;
        const error = isValid ?null: new Error('invalid mime type')
       // console.log(error)
        cb(error,isValid)
    }

})


module.exports = codeUploader
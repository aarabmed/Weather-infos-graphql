const { v1: uuid } = require('uuid');
const {createWriteStream ,mkdir } = require("fs");
const path = require('path');
const {Storage} = require('@google-cloud/storage');

const UPLOADED_IMAGES = './images';

const storage = new Storage({
    keyFilename: path.join(__dirname,"../geoinfoApi-d1962fdf02b1.json"),
    projectId: "geoinfoapi"
});


let gc = storage.bucket("weather-icons")

const storeFS = ({ stream, filename,mimetype }) => {
    const fName= `${filename}`
    const path = `images/icons/${filename}`
    return new Promise((resolve, reject) =>{
        stream
            .on('error', error => {
            
                if (stream.truncated)
                // Delete the truncated file.
               // await gc.file(path).delete()
                arrayError.push({imageError:"Please select a file with size 700 KB or less"})
                reject(error)
            })
            .pipe(gc.file(path).createWriteStream({
                resumable:false,
                gzip:true,
            }))
            .on('error', error => reject(error))
            .on('finish', () =>{
                createWriteStream(path)
                return resolve({
                    _id:uuid(),
                    filename:fName,
                    mimetype:mimetype,
                    path:path
                })
            }) 
        })
}

let process_upload = async upload => {
    mkdir("images/icons", { recursive: true }, (err) => {
        if (err) throw err;
    });
    
    let { filename, mimetype, encoding, createReadStream } = await upload

    if(mimetype !== 'image/jpeg' && mimetype !=='image/png'){
        arrayError.push({imageError:"Please select a file with one of the following formats: jpeg, jpg, png"})
    }     
    
    const stream = createReadStream()
    return storeFS({ stream, filename,mimetype })
    
}

module.exports = process_upload;



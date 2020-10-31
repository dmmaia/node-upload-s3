const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer')

let NeDb = require('nedb')

let dbImages = new NeDb({
  filename: 'db/repositories.db',
  autoload: true
})

routes.post('/images', multer(multerConfig).single('file'), (req, res)=>{
  console.log(req.file);
  const {tableId, userId} = req.body;
  const newImage = [{
    name: req.file.originalname,
    fileName: req.file.filename,
    tableId,
    userId,
    date: new Date()
  }]
  dbImages.insert(newImage, (err, image) =>{
    if(err) {
      return res.status(400).send(err)
    } else{
      return res.status(200).json(image)
    }
  })
});

module.exports = routes
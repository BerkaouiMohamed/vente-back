const productrouter=require('express').Router()
const productController=require('../contorllers/productController')
const verifToken = require('../middelwares/verifToken')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)   
    }
  })    

  const upload = multer({ storage: storage })

productrouter.route('/')
.get(productController.getAllProducts)
.post(verifToken,upload.array('images'),productController.createProduct)
productrouter.route('/:id')
.get(verifToken,productController.getSingleProduct)
.put(verifToken,productController.editProduct)
.delete(verifToken,productController.deleteProduct)
module.exports=productrouter
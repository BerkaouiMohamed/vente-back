const {Schema  , model} = require('mongoose')

const productSchema = new Schema({
    title: {
        type : String,
        required : true 
    },
    brand : {
        type : String,
        required : true
    },
    price : {
        type : Number, 
        required : true,
        validate:[ (value) => value > 0, "price must be greater than 0"]
        
   
    },
    color : {
        type : String,
        required : true
    },
    images : {
        type : [String],
        required : true
    },
    category : {
        type : String,
        required : true,
    enum:["tshirt" , "pant" ,"dress", "shoes","bag"],
},
status : {
    type : Boolean,
    default : true
}
},
{
    timestamps : true
})

const productModel= new model("Product",productSchema)

module.exports = productModel
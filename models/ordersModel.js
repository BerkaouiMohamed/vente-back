const {Schema  , model} = require('mongoose')


const orderSchema = new Schema({
 
    totalPrice : {
        type : Number,
        required : true
    },
    products : {
        type : [{type : Schema.Types.ObjectId, ref : "Product", required : true}],
        required : true
    },
    user :{type: {name : String,lastNAme : String, email : String, phone : Number, address : String},required:true}
    ,
    status : {
        type : String,
        default : "pending",
        required : true,
        enum : ["pending" , "completed", "canceled"]
    },
 
  
},{
    timestamps : true})

module.exports = model('Order' , orderSchema)
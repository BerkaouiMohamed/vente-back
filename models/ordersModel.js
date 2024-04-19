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
    user :{type: {name : {type : String, required : true},lastNAme : String, email : {type:String , required : true}, phone : {type:Number , required : true}, address : {type:String , required : true}},required:true}
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
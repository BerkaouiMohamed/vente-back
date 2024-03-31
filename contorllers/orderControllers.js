const orderModel = require('../models/ordersModel')
const asyncWrapper = require('../middelwares/asyncWrapper')

const orderController = {
    getAllOrders: asyncWrapper(async (req, res) => {
        const orders = await orderModel.find()
        res.status(200).json({status: "success",data : orders})
        
    }),
    createOrder: asyncWrapper(async (req, res) => {
        const order = await orderModel.create(req.body)
        res.status(200).json({status: "success",data : order})
        
    }),
    getSingleOrder: asyncWrapper(async (req, res) => {
        const order = await orderModel.findById(req.params.id)
        res.status(200).json({status: "success",data : order})
        
    }),
    editOrder: asyncWrapper(async (req, res) => {
        const order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.status(200).json({status: "success",data : order})
        
    }),
    deleteOrder: asyncWrapper(async (req, res) => {
        const order = await orderModel.findByIdAndDelete(req.params.id)
        res.status(200).json({status: "success",data : order})  
        
    }),

}
module.exports = orderController
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const DBConnnection = require('./utils/DBConnection')
const appError = require('./utils/errorCreator')
const path= require('path')
const cors=require('cors')
require('dotenv').config()
app.use(cors()) 
 
app.use(express.static(path.join(__dirname,'uploads')))

DBConnnection()
app.use(express.json())
app.post('/api/login',require('./contorllers/authControllers'))
app.use('/api/products',require('./routers/productRouter'))
app.use('/api/orders',require('./routers/orderRouter')) 


app.all('*',(req,res,next)=>{
    next(appError('Page not found'))
})
app.use((error,req,res,next)=>{
    const status=error.statusCode || 500
    const message=error.message
    res.status(status).json({status:status<500?'fail':'error',message:message})
})
const port=process.env.PORT || 8000
mongoose.connection.once('open',()=>{app.listen(port,()=>console.log(`server is running on port ${port}`))})
mongoose.connection.on('error',err=>console.log(err)) 
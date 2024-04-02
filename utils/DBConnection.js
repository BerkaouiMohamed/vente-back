const mongoose = require("mongoose");
require ("dotenv").config()
const DBConnnection =  () => {
    // mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME
    })  
    .then(() => {
        console.log("Connected to MongoDB");
    })   
    .catch((error) => {
        console.log(error); 
    })}

module.exports = DBConnnection
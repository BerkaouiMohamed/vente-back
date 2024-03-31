const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const asyncWrapper = require("../middelwares/asyncWrapper");
const appError = require("../utils/errorCreator");

// const registerController = async (req,res)=>{
//     const {name , email , password} = req.body
//     if(!name || !email || !password){
//         return res.status(400).json({message : 'please enter all fields'})
//     }
//     const user = await User.findOne({email})
//     if(user){
//         return res.status(400).json({message : 'user already exists'})
//     }
//     const hashedPassword = await bycrypt.hash(password , 10)
//     const newUser = new User({name , email , password : hashedPassword})
//     await newUser.save()
//     res.status(200).json({message : 'user created successfully'})
// }

const loginController = asyncWrapper(async (req, res,next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: "please enter all fields" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    const error=appError("user not found" , 404)
    return next(error)
  }
  const isMatch = await bycrypt.compare(password, user.password);
  if (!isMatch) {
    const error=appError("incorrect credentials" , 404)
    return next(error)
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     maxAge: 24 * 60 * 60 * 1000,
//   });
  res.status(200).json({status: "success",data: token });
});
module.exports = loginController;

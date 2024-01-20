import asyncHandler from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email){
        throw new ApiError(400,"Please enter your email");
    }
    if(!password){
        throw new ApiError(400,"Please enter your password");
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400,"Invalid credentials");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid Password");
    }

    const loggedInUser = await User.findOne({email}).select("-password");

    const accessToken = await user.generateAccessToken();
    
    const options ={
        httpOnly:true,
        secure:true,
    }

    res.status(200)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(
            200,
            {user:loggedInUser},
            "Login successful"
        )
    )

})

const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name){
        throw new ApiError(400,"Please enter your name");
    }
    if(!email){
        throw new ApiError(400,"Please enter your email");
    }
    if(!password){
        throw new ApiError(400,"Please enter your password");
    }

    const user = await User.create({name,email,password});
    await user.save();

    const registerdUser = await User.findOne({email}).select("-password");

    res.status(201).json(
        new ApiResponse(
            201,
            {user:registerdUser},
            "User registered successfully"
        )
    )

})


export{
    loginUser,
    registerUser,
}
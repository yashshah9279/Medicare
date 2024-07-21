import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtTokens.js";

export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        aadhar,
        role,
    }=req.body;
    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !aadhar ||
        !role
    ){
        return next(new ErrorHandler("Please fill full form!",400));
    }
    let user=await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User Already Registered!",400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        aadhar,
        role,
    });
    generateToken(user, "User Registered!",200, res);
    
});

export const login =catchAsyncErrors(async(req,res,next)=>{
    const {email ,password, confirmPassword, role}=req.body;
    if(!email || !password ||  !confirmPassword|| !role){
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }
    if(password !==confirmPassword){
        return next(new ErrorHandler("Password And Confirm Password Do Not Match!", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password Or Email", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password Or Email", 400));
    }
    if(role !==user.role){
        return next(new ErrorHandler("User With This Role Not Found!", 400));
    }
    generateToken(user, "User Login Successfully!",200, res);
});

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        aadhar
    }=req.body;
    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !aadhar 
    ){
        return next(new ErrorHandler("Please fill full form!",400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`));
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        aadhar,
        role: "Admin",
    });
    res.status(200).json({
        success: true,
        message: "New Admin Registered!",
    })
})
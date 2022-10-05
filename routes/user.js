import express from 'express';
import bcrypt from 'bcrypt';
import { AuthModel } from "../models/authModels.js";
import { ErrorModel, ResponseModel } from '../models/responseModels.js';
import  jwt  from 'jsonwebtoken';
const userRoutes = express.Router();

const saltRounds = 10;

userRoutes.post('/login',async function(req,res){
    const body = req.body;
    const email = body.email;
    const password = body.password; 

    if(email && password){

        const user = await AuthModel.findOne({email:email},{_id:0,__v:0});

        if(user){

            const isValidPassword = await bcrypt.compare(password,user.password);

            if(isValidPassword){
                const token = await jwt.sign({id:user._id,email:user.email},process.env.JWTSECRATE);

                const data = {
                    'user_data':{
                        'email':user.email,
                        'name':user.name,
                    },
                    'token':token,
                };

                res.send(new ResponseModel({responseCode:200,isSuccess:true,data:data}));

            }else{

                res.send(new ErrorModel({errorCode:400,errorMessage:'Invalid Password'}));

            }

        }else{

            res.send(new ErrorModel({errorCode:400,errorMessage:'User Not Found'}));

        }
    }else{

        res.send(new ErrorModel({errorCode:400,errorMessage:'Missing Body'}));

    }

});

userRoutes.post('/register',async function(req,res){
    const {email,password,name} = req.body;
   if(email && password){
       const existingUser = await AuthModel.findOne({email:email});
       if(existingUser){
        res.send(new ErrorModel({errorCode:400,errorMessage:'User Already Exist'}));
       }else{
               bcrypt.hash(password, saltRounds,async function(err, hash) {
                if(err){
                    res.send(new ErrorModel({errorCode:400,errorMessage:'Failed To Create User'}));
                }else{
                   const newUser = await AuthModel.create({email:email,password:hash,name:name});
                   if(newUser){
                   const token = await jwt.sign({id:newUser._id,email:newUser.email},process.env.JWTSECRATE,{expiresIn:'15h'});
                    const data = {
                        'user_data':{
                            'email':newUser.email,
                            'name':newUser.name,
                        },
                        'token':token,
                    };
                   res.send(new ResponseModel({responseCode:200,isSuccess:true,data:data,message:'Successfully Registered User'}));
                }else{
                    res.send(new ErrorModel({errorCode:400,errorMessage:'Failed To Create User'}));
                }   
                }
               });
       }
      
   }else{
       res.send(new ErrorModel({errorCode:400,errorMessage:'Missing One Or More Fields'}));
   }
});




export default userRoutes;
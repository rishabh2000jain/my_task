import TaskModel from "../models/taskModels.js";
import express from "express";
import { ErrorModel, ResponseModel } from "../models/responseModels.js";
import  Jwt  from "jsonwebtoken";
import { decodeBearerToken,getTokenFromRequest } from "../helpers/jwtHelpers.js";

const taskRoutes = new express.Router();

taskRoutes.get('/',async function(req,res){
    try{
        const tasks = await TaskModel.find({});
        res.send(new ResponseModel({responseCode:200,data:tasks,message:'Successfully Retrive Tasks'}));
    }catch(error){
        res.send(new ErrorModel({responseCode:400,errorMessage:'Failed To Retrive Tasks'}));
    }
});

taskRoutes.post('/',async function(req,res){
    try{
        const jwtPayload = await decodeBearerToken(getTokenFromRequest(req));
        console.log(jwtPayload);
        const {title,description} = req.body;
        if(title==undefined || title ==''){
            res.send(new ErrorModel({responseCode:400,errorMessage:'Task Title Can\'t Be Empty'}));
        }else{
            const tasks = await TaskModel.create({
                'title':title,
                'description':description,
                'userId':jwtPayload.id,
            });
            res.send(new ResponseModel({responseCode:200,data:tasks,message:'Successfully Added Task'}));
        }
    }catch(error){
        res.send(new ErrorModel({responseCode:400,errorMessage:error.message}));
    }
});

export default taskRoutes;
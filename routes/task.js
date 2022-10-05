import TaskModel from "../models/taskModels.js";
import express from "express";
import { ErrorModel, ResponseModel } from "../models/responseModels.js";
import { decodeBearerToken,getTokenFromRequest } from "../helpers/jwtHelpers.js";

const taskRoutes = new express.Router();

taskRoutes.get('/',async function(req,res){
    try{
        const userData = await decodeBearerToken(getTokenFromRequest(req));
        const tasks = await TaskModel.find({userId:userData.userId});
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

taskRoutes.patch('/:id',async function(req,res){
    try{
        const documentId = req.params.id;
        const body = req.body;
        if(body.title === null ||body.title == ''){
            res.send(new ErrorModel({responseCode:400,errorMessage:'Task Title Can\'t Be Empty'}));
        }else{
            req.body.date = Date.now();
            const updatedTask = await TaskModel.findByIdAndUpdate(documentId,req.body);
            res.send(new ResponseModel({responseCode:200,data:updatedTask,message:'Successfully Updated Task'}));
        }
        
    }catch(error){
        res.send(new ErrorModel({responseCode:400,errorMessage:error.message}));
    }
});


export default taskRoutes;
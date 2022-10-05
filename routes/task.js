import TaskModel from "../models/taskModels.js";
import express from "express";
import { ErrorModel, ResponseModel } from "../models/responseModels.js";

const taskRoutes = new express.Router();

taskRoutes.get('/',async function(req,res){
    try{
        const tasks = await TaskModel.find({});
        res.send(new ResponseModel({responseCode:200,data:tasks,message:'Successfully Retrive Data'}));
    }catch(error){
        res.send(new ErrorModel({responseCode:400,errorMessage:'Failed To Retrive Data'}));
    }
});

export default taskRoutes;
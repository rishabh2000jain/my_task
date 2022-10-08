import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/user.js'
import authenticator  from './middlewares/checkAuth.middleware.js';
import taskRoutes from './routes/task.js';
import { cors } from './helpers/cors.js';

dotenv.config();
const __dirname = path.resolve();
mongoose.connect(process.env.DBPATH,function(error){
    if(error){
        console.log('Process Db Connection Failed');
    }else{
        console.log('Process Db Connected');
    }
});



const app = express();
const parser = bodyParser.urlencoded({extended:true});


app.use(parser);
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

app.use(cors);

app.use('/task',authenticator);

//apis
app.use('/user',userRoutes);
app.use('/task',taskRoutes);




app.listen(process.env.PORT,async function(){
    console.log(`Server Started ${process.env.PORT} ${__dirname}`);
});
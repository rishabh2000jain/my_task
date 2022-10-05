import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        default:''
    },
    description:String,
    userId:{
      type:String,
      require:true,  
    },
    isComplete:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now,
        require:true
    }
});


const TaskModel =  mongoose.model('Task',TaskSchema);

export default TaskModel;
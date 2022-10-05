import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:String
});

const AuthModel = mongoose.model('User',UserSchema);

export {UserSchema,AuthModel};
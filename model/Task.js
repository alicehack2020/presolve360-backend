import mongoose from "mongoose";
 
//defining Schema
const taskSchema=new mongoose.Schema({
    task_name:{type:String,required:true,trim:true},
    Description:{type:String,required:true,trim:true},
    developer:{type:String,required:true,trim:true},
    task_Date:{type:String,required:true,trim:true}, 
    status:{type:String,required:true,trim:true} 
})

//Model
const taskModel=mongoose.model("task",taskSchema);
export default taskModel;
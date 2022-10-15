import taskModel from "../model/Task.js"
class taskController{
    static addTask=async(req,res)=>
    {
      const {task_name,Description,developer,task_Date,status}=req.body
        const doc=new taskModel({
            task_name:task_name,
            Description:Description,
            developer:developer,
            task_Date:task_Date,
            status:status,
          })
          await doc.save()
          res.send({"status":"success","message":"successfully"})

    }

    static deleteTask=async(req,res)=>
    {
      
      const {task_Id}=req.params;
      //console.log(task_Id)
      const data=await taskModel.deleteOne({_id:task_Id})
      if(data)
      {
        res.send({"status":"success","message":"deleted successfully","data":data})
      }
      else{
        res.send({"staus":"failed","message":"Not able to delete"})
      }
        
    }

    static updateTask=async(req,res)=>
    {
      const {task_Id}=req.params 
      const data=await taskModel.find({_id:task_Id})
      const newData=req.body;
      if(data.length!=0)
      {
         const info=await taskModel.updateMany({_id:task_Id},{$set: newData})
         res.send({"status":"success","data":info})
      }
      else{
         res.send({"status":"failed","message":"not found","data":data})
      }    
    }

     //user list
     static taskList=async(req,res)=>{
      const data=await taskModel.find()
      if(data)
      {
          res.send({"message":"success","data":data})
      }
      else{
        res.send({"message":"no data found"})
      }
    }
}
export default taskController;
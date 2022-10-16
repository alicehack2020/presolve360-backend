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

    //get task list for graph
    static taskListForGraph=async(req,res)=>{
      const data=await taskModel.find()
      if(data)
      {
        
        var info=[
          {
             month:"January",
             incomplete:0,
             complete:0
          },
          {
            month:"February",
            incomplete:0,
            complete:0
         },
         {
          month:"March",
          incomplete:0,
          complete:0
         },
         {
          month:"April",
          incomplete:0,
          complete:0
          },
          {
            month:"May",
            incomplete:0,
            complete:0
           },
           {
            month:"Jun",
            incomplete:0,
            complete:0
           },
           {
            month:"July",
            incomplete:0,
            complete:0
           },
           {
            month:"August",
            incomplete:0,
            complete:0
           },
           {
            month:"September",
            incomplete:0,
            complete:0
           },
           {
            month:"October",
            incomplete:0,
            complete:0
           },
           {
            month:"November",
            incomplete:0,
            complete:0
           },
           {
            month:"December",
            incomplete:0,
            complete:0
           },

       ] 


      for(var i=0;i<data.length;i++)
      {
        
          const date = new Date(data[i].task_Date);  // 2022-10-25
          const month = date.toLocaleString('default', { month: 'long' });
        
          for(var j=0;j<info.length;j++)
           {
              if(month==info[j].month) 
              {
                if(data[i].status==='complete')
                {
                  info[j].complete=info[j].complete+1 
                }
                else if(data[i].status==='incomplete')
                {
                  info[j].incomplete=info[j].incomplete+1 
                }
              }
           }

      }
     

         
          res.send({"message":"success","data":info})
      }
      else{
        res.send({"message":"no data found"})
      }
    }
}
export default taskController;
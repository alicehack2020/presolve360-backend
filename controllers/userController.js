import UserModel from "../model/User.js";
import bcrypt from "bcrypt"
import Jwt  from "jsonwebtoken";

class UserController{
   
  //register
    static userRegistration=async(req,res)=>{
        const {name,email,password,password_confirmation}=req.body;
        const user=await UserModel.findOne({email:email})

        if(user)
        {
            res.send({"status":"failed","message":"Email already taken"})
        }
        else
        {
            if(name&&email&&password&&password_confirmation)
            {
              if(password===password_confirmation)
              {
                   try {
                    const salt=await bcrypt.genSalt(12)
                    const hashPassword=await bcrypt.hash(password,salt)
                    
                    const doc=new UserModel({
                      name:name,
                      email:email,
                      password:hashPassword,
                    
                    })

                    await doc.save()
                    const user=await UserModel.findOne({email:email})
                    const token=Jwt.sign({userID:user._id},
                      process.env.JWT_SECRET_KEY,{expiresIn:"5d"})


                    res.send({"status":"success","message":"registration successfully","token":token})


                   } 
                   catch (error) {
                    res.send({"status":"failed","message":error})
                   }

                   
              } 
              else{
                res.send({"status":"failed","message":"password and confirm password doesn't match"})
              }
            }
            else{
                res.send({"status":"failed","message":"all fields are required"})
            }
        }

    }

    //login
    static userLogin=async(req,res)=>{
      const {email,password}=req.body;
      if(email&&password)
      {
        
        const user=await UserModel.findOne({email:email})
        if(user!=null)
        {
          const isMatch=await bcrypt.compare(password,user.password)
          if(isMatch && (email===user.email))
          {
             //const user=await UserModel.findOne({email:email})
              const token=Jwt.sign({userID:user._id},
              process.env.JWT_SECRET_KEY,{expiresIn:"5d"})
              const data = await UserModel.findById(user._id).select('-password')
              res.send({"status":"success","message":"login success","token":token,"data":data})

          }
          else{
            res.send({"status":"failed","message":"email or password incorrect"})
 
          }

        }
        else{
          res.send({"status":"failed","message":"please register"})

        }
      }
      else{
        res.send({"status":"failed","message":"all field are required"})
      }
    }


    //user list
    static userList=async(req,res)=>{
      const data=await UserModel.find()
      if(data)
      {
          res.send({"message":"success","data":data})
      }
      else{
        res.send({"message":"no data found"})
      }
    }


    // //teacher list
    // static teacherList=async(req,res)=>{
    //   const data=await UserModel.find({role:"teacher"})
    //   if(data)
    //   {
    //       res.send({"message":"success","data":data})
    //   }
    //   else{
    //     res.send({"message":"no data found"})
    //   }
    // }


    // //addcourse in user

    // static addCourseInUser=async(req,res)=>
    // { 
    //     const {user_id,course_id}=req.body;

    //     const userDetail=await UserModel.find({"_id":user_id})
    //     var {courses}=userDetail[0];
    //     courses.push(course_id)
    //     const data=await UserModel.updateOne({"_id":user_id},{$set:{"courses":courses}})
    //     if(data)
    //     {
    //       console.log(data)
    //       res.send({"message":"Course Enrollment Completed"}) 
    //     }
    //     else{
    //       res.send({"staus":"failed","message":"something went wrong"})  
    //     }
    // }



    //  //user Details
    //  static userDetails=async(req,res)=>{
    //   const {user_id}=req.body;
    //   const data=await UserModel.find({"_id":user_id})
    //   if(data)
    //   {
    //       res.send({"message":"success","data":data})
    //   }
    //   else{
    //     res.send({"message":"no data found"})
    //   }
    // }

    // static deleteUser=async(req,res)=>{
    //   const {user_Id}=req.body;
    //   const data=await UserModel.deleteOne({_id:user_Id})
    //   if(data)
    //   {
    //     res.send({"status":"success","message":"deleted successfully","data":data})
    //   }
    //   else{
    //     res.send({"staus":"failed","message":"Not able to delete"})
    //   }
    
    // }

    
}

export default UserController;
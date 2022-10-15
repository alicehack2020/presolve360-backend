import express from "express"
const router=express.Router();

import taskController from "../controllers/taskController.js";
 

 
router.post('/addTask',taskController.addTask);
router.delete('/deleteTask/:task_Id',taskController.deleteTask);
router.post('/updateTask/:task_Id',taskController.updateTask);
router.get('/getAllTask',taskController.taskList);

export default router;
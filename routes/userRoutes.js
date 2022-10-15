import express from "express"
const router=express.Router();

import UserController from "../controllers/userController.js"


//public routes
router.post('/register',UserController.userRegistration);
router.post('/login',UserController.userLogin);
router.get('/userList',UserController.userList);
 

export default router;
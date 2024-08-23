import express from "express"
const router = express.Router();

import auth from "../controllers/auth.js";
import { userSignupValidator } from '../validators/index.js'
const { signup, signIn } = auth;



router.post('/signup',userSignupValidator , signup)



export default router
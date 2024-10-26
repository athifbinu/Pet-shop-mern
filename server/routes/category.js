import express from "express"
const router = express.Router();

import category from "../controllers/category.js"

const {
  create,
  categoryById,
  read_Category, 
  update_cat,
  del_cat,
  cat_List
} = category

import auth from "../controllers/auth.js"
const { requireSignin, isAdmin, isAuth } =auth
import { userById } from "../controllers/user.js";


// Main Category Routes
router.get("/category/:categoryById", read_Category);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
  "/category/:categoryById/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update_cat
);
router.delete(
  "/category/:categoryById/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  del_cat
);
router.get("/categories", cat_List);





router.param("categoryById", categoryById);

router.param("userId", userById);

export default router;

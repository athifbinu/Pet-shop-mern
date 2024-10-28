import Category from "../models/category.js";
import { errorHandler } from "../helpers/dbErrorHandler.js";

export const create = async (req, res)=>{
    try {
        console.log("req.body" , req.body);
        const { catName } = req.body
        
        const data = new Category({ name: catName });
                    await data.save()
                    res.json({
                        data
                    })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            
            
            error: errorHandler(error),
          });
    }

}



export const categoryById = async(req, res, next, id) => {
    try {
        const category = await Category.findById(id)
        if(!category){
            return res.status(400).json({ error: 'That Category is not found' });
        }
        req.category =  category
        next()
        
    } catch (error) {
        console.error('Error in Category Id', error);
        return res.status(500).json({ error: 'Something went wrong' });
  
        
    }
};

export const read_Category = (req, res)=>{
    return res.json(req.category)
}

export const update_cat = async(req, res)=>{
  try {

    const category = req.category
    console.log(category);
    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }
    category.name = req.body.name, 
    console.log("----------------------------------", category.name);
    const updated_category =await category.save()
    if(!updated_category){
      return res.status(400).json({
        error: "Invalid Data"
    });
    }
    console.log("**********************************", updated_category);
    res.json({
      message: "Category updated successfully",
      category: updated_category,
    });
  } catch (error) {
    console.log("error*********************", error);
    res.status(400).json({
      error: errorHandler(error),
    });
  }
}

export const del_cat= async(req, res)=>{
 try {
  const category = req.category
  const del_Category = await category.deleteOne()
  if(!del_Category){
    return res.status(400).json({
        error: errorHandler(erroor)
    })
   }

   res.json({"message":"Product successfuly deleted"})


  
 } catch (error) {
  res.status(400).json({
    error: errorHandler(err),
  });
  
 }
}

export const cat_List = async (req, res) => {
  try {
    console.log("Fetching category list");
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json({
      categories,
    });
  } catch (error) {
    res.status(400).json({
      error: errorHandler(error),
    });
  }
};





export default { 
    create, 
    categoryById,
    read_Category,
    update_cat,
    del_cat,
    cat_List

}
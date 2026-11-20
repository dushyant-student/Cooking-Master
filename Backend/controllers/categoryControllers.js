import CategoryModel from "../models/categoryModel.js";
import { v2 as cloudinary } from "cloudinary";
import recipeModel from "../models/recipeModel.js";


export const addCategory = async (req, res) => {
  try {
    const userId = req.user?.id;
    const categoryType = (req.body?.categoryType).toLowerCase();

    if (!req.file || !categoryType || !userId ) {
      return res.status(400).send({
        message: "Please fill all values",
        success: false,
      });

    }

    const existCategory = await CategoryModel.findOne(
      { 
        categoryType : categoryType ,
        userId : userId
      }
    );
    if (existCategory) {
      return res.status(409).send({
        message: "Category already exists",
        success: false,
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const category = await CategoryModel.create({
      categoryType: categoryType,
      imageURL: result.secure_url,
      public_id: result.public_id ,
      userId : userId
    });

    return res.status(201).send({
      message: "Category Added Successfully",
      category,
      success: true,
    });

  } catch (err) {
    // console.error("err in addCategory:-",err);
    return res.status(500).send(
      {
        message: "Internal Server Error",
        success: false,
      }
    );

  }
};



export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params; //category id for Updating category 
    let { categoryType } = req.body;
    categoryType = (categoryType).toLowerCase();

    const categoryExist = await CategoryModel.findOne({_id : id });

    if (!categoryExist) {
      return res.send(
        {
          "message": "category not found",
          success: false
        }
      )
    }

    if (req.file && user?.public_id) {
      if (categoryExist?.public_id) {
        await cloudinary.uploader.destroy(categoryExist.public_id);
      };
      const result = await cloudinary.uploader.upload(req.file.path);
      categoryExist.imageURL = result.secure_url;
    }

    if (categoryType) {
      //Updates all recipes belong to this category 
      await recipeModel.updateMany(
        {
          categoryType: categoryExist.categoryType,
          categoryTypeId: categoryExist._id
        },
        {
          $set:
            { categoryType: categoryType }
        }
      );
      //change Category name 
      categoryExist.categoryType = categoryType;
      await categoryExist.save();
    }
    return res.status(200).send(
      {
        "message": "Category update SuccessFully",
        categoryExist,
        success: true
      }
    )

  } catch (err) {
    // console.log(err, "Error")
    return res.status(500).send(
      {
        message: "Internal Server Error",
        success: false,
      }

    );
  }

}


//get Specific categroy by id For Updating Category
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).send(
      {
        message: "category",
        category,
        success: true
      }
    );

  } catch (error) {
    // console.log(error);
    res.status(500).json(
      {
        message: "Server error",
        success: false
      }
    );
  }
};




export const getCategories = async (req, res) => {
  
  try {
    const allCategories = await CategoryModel.find();
    if (allCategories) {
      return res.status(200).send({ "message": "All Categories.. ", allCategories, success: true })
    }
    return res.status(404).send({ "message": "Not Found category", sucess: false })

  } catch (err) {
    // console.log(err);
    res.status(500).json(
      {
        message: "Server error",
      }
    );
  }
}


//Delete Category 
export const deleteCategory = async (req, res) => {

  try {
    const { id } = req.params;
    const del_category = await CategoryModel.findByIdAndDelete({ _id: id });

    if (del_category.public_id){
      return ;
    }
    
    await cloudinary.uploader.destroy(del_category.public_id);

    await recipeModel.updateMany(
      {
        categoryType: del_category.categoryType,
        categoryTypeId: del_category._id
      },
      {
        $set:
        {
          categoryType: "none"
        }
      }
    );

    if (!del_category) {
      return res.status(404).send(
        {
          "message": "category does not Exist",
          success: false
        }
      )
    }

    return res.status(200).send(
      { 
        "message": "Category Delete succesfully", 
        success: true 
      }
    )
  } catch (err) {
    // console.log("err in delete category", err)
    res.status(500).send(
      {
        message: "Server error",
        success:false
      }
    );
  }

}


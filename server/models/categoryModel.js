import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    imageURL:{
        type:String,
        required:true,
        unique:true,
    },
    categoryType:{
        type:String,
        required:true,
        trim:true
    },
    public_id:{
        type:String,
        required:true
    },
    userId : {
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User",
        required:true
    }

})

const CategoryModel = mongoose.model("Category",categorySchema);
export default CategoryModel;
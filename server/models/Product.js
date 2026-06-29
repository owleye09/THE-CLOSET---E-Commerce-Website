const mongoose=require("mongoose");

const productSchema=new mongoose.Schema(
  {
    name: {
      type:String,
      required:true,
    },
    price:{
      type:Number,
      required:true,
    },
    category: {
      type:String,
      required:true,
    },
    tag: {
      type:String,
      default:"new",
    },
    image: {
      type:String,
      required:true,
    },
    description: {
      type:String,
      default:"A stylish fashion product for everyday wear.",
    },
  },
  {
    timestamps:true,
  }
);

module.exports=mongoose.model("Product",productSchema);
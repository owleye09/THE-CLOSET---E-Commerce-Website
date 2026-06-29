const express=require("express");
const Product=require("../models/Product");

const router=express.Router();
//get all products
router.get("/",async(req,res)=> {
  try {
    const products=await Product.find();
    res.json(products);
  }catch(error) {
    res.status(500).json({message: "Failed to fetch products"});
  }
});

//add product
router.post("/",async(req,res)=>{
  try{
    const product=await Product.create(req.body);
    res.status(201).json(product);
  }catch(error) {
    res.status(500).json({message: "Failed to add product"});
  }
});
//get single product by id
router.get("/:id",async(req,res)=> {
  try{
    const product=await Product.findById(req.params.id);

    if(!product){
      return res.status(404).json({message:"Product not found"});
    }
    res.json(product);
  }catch(error){
    res.status(500).json({message:"Failed to fetch product"});
  }
});
module.exports=router;
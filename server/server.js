const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const productRoutes=require("./routes/productRoutes");
const authRoutes=require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/products",productRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/orders",orderRoutes);

app.get("/",(req,res) => {
  res.send("E-commerce backend is running");
});

const PORT=process.env.PORT || 5000;

mongoose 
.connect(process.env.MONGO_URI) 
.then(()=> {
  console.log("MongoDB connected successfully");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.log("MongoDB connection failed: ",error.message);
});
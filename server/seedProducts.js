const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Floral Summer Dress",
    price: 49.99,
    category: "clothing",
    tag: "best seller",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A floral summer dress designed for casual and elegant looks.",
  },
  {
    name: "Classic Denim Jacket",
    price: 64.99,
    category: "clothing",
    tag: "best seller",
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    description: "A classic denim jacket that pairs well with everyday outfits.",
  },
  {
    name: "Elegant Handbag",
    price: 39.99,
    category: "accessories",
    tag: "new",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    description: "A stylish handbag suitable for daily use and special occasions.",
  },
  {
    name: "Gold Hoop Earrings",
    price: 19.99,
    category: "accessories",
    tag: "best seller",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
    description: "Simple gold hoop earrings to complete your outfit.",
  },
  {
    name: "Casual White Top",
    price: 29.99,
    category: "clothing",
    tag: "new",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254",
    description: "A clean white top for casual and comfortable styling.",
  },
  {
    name: "Stylish Sunglasses",
    price: 24.99,
    category: "accessories",
    tag: "best seller",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    description: "Modern sunglasses that add a stylish touch to your look.",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products added successfully");
    process.exit();
  } catch (error) {
    console.log("Error adding products:", error.message);
    process.exit(1);
  }
};

seedProducts();
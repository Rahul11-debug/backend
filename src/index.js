// require("dotenv").config({path: "./.env"});

import dotenv from "dotenv";
import { app } from "./app.js";


import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });
connectDB()
.then(() => {
  app.listen(process.env.PORT || 3000, () => {  
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  })
})
.catch((error) => {
  console.error("Database connection error:", error);
  process.exit(1);
});




























/*
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect('${process.env.MONGO_URI/${DB_NAME}')
    app.on("error", (error) => {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    })
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
    }
})()
*/

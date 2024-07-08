import { app } from "./src/app/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB is connection failed");
  }
};

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

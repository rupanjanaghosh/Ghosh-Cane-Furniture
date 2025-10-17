import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI?.trim(); 
    console.log("Connecting to MongoDB:", uri);
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;

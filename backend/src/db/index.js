import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
      {
        writeConcern: { w: "majority" },
      }
    );
    console.log(
      "\nMongoDB connection established successfully! \nDB Host: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("MongoDB connection unsucessfull!: ", error);
    process.exit(1);
  }
}

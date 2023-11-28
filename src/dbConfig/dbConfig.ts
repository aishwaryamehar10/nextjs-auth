import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    //every event is listened by thw word dot on
    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error." + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}

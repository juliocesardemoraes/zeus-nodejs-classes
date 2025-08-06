import mongoose from "mongoose";
const mongoURI = process.env.DB_KEY;

const connectToDatabase = () => {
  mongoose.connect(mongoURI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to the database");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from the database");
  });
};

export default connectToDatabase;

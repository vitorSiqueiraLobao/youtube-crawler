import mongoose, { ConnectOptions } from "mongoose";

export async function connectDb() {
  try {
    mongoose.connect("mongodb://mongodb-myapp:27017/myapp");
    mongoose.Promise = global.Promise;
    console.log(">>> Database connected");
  } catch (err) {
    console.log(err);
  }
}

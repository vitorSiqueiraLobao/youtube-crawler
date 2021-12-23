import express from "express";
import { UserModel } from "./db/models/userModel";
import { register, getUsers } from "./db/controllers/authController";
import { connectDb } from "./db/conn";
connectDb();
const app = express();

app.use(express.json());
console.log("register");
app.post("/register", async (req, res) => {
  console.log(UserModel);
  const user = await UserModel.create(req.body);
  res.send(user);
});
app.get("/", getUsers);
app.listen(4000, () => console.log("running"));

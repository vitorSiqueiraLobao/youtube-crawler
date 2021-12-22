import express from "express";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Ola mundo");
});

app.listen(4000, () => console.log("running"));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MongoConnect from "./utils/DB.js";
dotenv.config();
const app = express();
MongoConnect();
app.use(cors());
const port = process.env.PORT;
app.get("/", (req, res) => {
  console.log("welcom to backend");
});

app.listen(port, () => {
  console.log(`server running on PORT : ${port}`);
});

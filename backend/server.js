import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MongoConnect from "./utils/DB.js";
import userRoute from "./routes/userRote.js";
dotenv.config();
MongoConnect();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

app.use("/api/v1", userRoute);

app.get("/", (req, res) => {
  console.log("welcom to backend");
});

app.listen(port, () => {
  console.log(`server running on PORT : ${port}`);
});

import express from "express";
const app = express();

app.get("/", (req, res) => {
  console.log("welcom to backend");
});

app.listen(5000, () => {
  console.log("server running");
});

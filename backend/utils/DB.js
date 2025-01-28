import mongoose from "mongoose";
const MongoConnect = () => {
  mongoose
    .connect(process.env.MONGODB_LINK)
    .then(() => {
      console.log("Data Base Connected successfully");
    })
    .catch(() => {
      console.log("ERROR while connecting database");
    });
};
export default MongoConnect;

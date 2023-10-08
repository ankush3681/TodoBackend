const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { UserRoute } = require("./route/user.route");
const { TodoRoute } = require("./route/todo.route");
const { auth } = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());
app.use("/user", UserRoute);

app.get("/",(req,res)=>{
  res.send({"msg":"This is the deployed Url of Todo"})
})

app.use(auth);
app.use("/todo", TodoRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("server is connected to Data Base");
    console.log(`server is running on the port ${process.env.port}`);
  } catch (err) {
    console.log("cannot connect to Data Base");
    console.log(err.message);
  }
});

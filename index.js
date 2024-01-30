const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT|| 3000;

//cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

const auth = require("./routes/auth");
app.use("/api/v1", auth);

require("./config/database").connect();

app.listen(PORT, ()=>{
    console.log("app is running successfully");
})

app.get("/",(req, res)=>{
    res.send(`<h1>homepage</h1>`);
})
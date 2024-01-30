const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,

    },
    role:{
        type: String,
        enum:["Admin","Student","Visitor"]
    }
    //enum se role ka space limit ho jata haii kewal ye teen values hi le skta haii 
    
})
module.exports= mongoose.model("User",userSchema);
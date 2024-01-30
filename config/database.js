const mongoose = require("mongoose");

require("dotenv").config();

exports.connect= ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(console.log("db is connected successfully"))
    .catch((error)=> {
        console.log('error');
        console.error(error);
        process.exit(1);
    } );
}
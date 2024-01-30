const bcrypt = require("bcrypt");
const User = require("../models/user");
//import JsonWebToken
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler

exports.signup = async (req, res) => {
     try{
        //get data
        const {name, email, password, role} = req.body;
        //check if user already exists
        const  existingUser = await User.findOne({email});
         
        if(existingUser){
          return res.status(400).json({
            success: false,
            message: 'user already exists',

          });
        }
        //secure password
        let hashedPassword;
        try{
             hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
         return res.status(400).json({
            success: false,
            message: 'error in hashing password',

          });
        }
        //create a new user
        const user = await User.create({
         name,email,password:hashedPassword,role
        })
        return res.status(200).json({
         success:true,
         message:"user created successfully",
        });

        

     }
     catch(error){
      console.log(error);
      return res.status(500).json({
         success: false,
         message: 'error in hashing password',

       });

     }
}

//login route handler


exports.login = async (req,res) => {
  try{
     //fetch email id and password from req body
     const {email, password} = req.body;
     //validate email and password or if email and password field is not filled properly
     if(!email ||!password){
      return res.status(400).json({
        success:false,
        message:"please fill all the details carefully"
      });
     }
     //check if user is registerd or not
     let user = await User.findOne({email});
     //if not registered user
     if(!user){
      return res.status(401).json({
        success:false,
        message:"user is not registerd",
      })
     }

     const payload ={
      email:user.email,
      id:user._id,
      role:user.role
   }
     //verify password and generate a jwt token
     if(await bcrypt.compare(password,user.password) ) {
      //pasword matches
      
      let token = jwt.sign(payload, process.env.JWT_SECRET,
                           {
                            expiresIn:"2h",
                           });
    //  console.log(user);
    //  const oldUser = {...user, token};
    //  oldUser.password = undefined;
    //  console.log(oldUser);
    //  user.password = undefined;
    //  console.log(user);
     //insert this token in user object
     user= user.toObject();
     user.token = token;
     console.log(user);
     //remove password from user object but not from the database
     user.password= undefined; //security purpose
     console.log(user);

     //create a cookie
     const options = {
      expires: new Date( Date.now() + 3*24*60*60*1000),
      //client site par access nhii kar skte haii
      httpOnly:true,
     }
      res.cookie("token", token, options).status(200).json({
      success:true,
      token,
      user,
      message:"user login successfully",
     });
    // res.status(200).json({
    //   success:true,
    //   token,
    //   user,
    //   message:"user login successfully",
    //  });
    }
     else {
      //password do not match
      return res.status(403).json({
        success:false,
        message:"password don't match",
      });

      }
   }
    
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:'login failure'
    });
 
  }
}
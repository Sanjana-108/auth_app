
//auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

//FOR AUTHENTICATION

exports.auth = (req,res, next) => {
     try{
        //extract jwt token
        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token);
        // console.log("header", req.header("Authorization"));

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        //if token is not available
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:"Token missing",
            });
        }
        //verify the token or decode
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            //add payload in the req body
            req.user = payload;
        }catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();

     } catch(error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong, while verifying the token',
        })

     }
}
//FOR AUTHORISATION
//second middleware for is student
exports.isStudent = (req,res, next) => {
    try{
       if(req.user.role !== "Student") {
        return res.status(401).json({
            success:false,
            message:'this is a protected route for student',
        })
       }
       next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'user role is not matching',
        })

    }

}

//third middleware for admin
exports.isAdmin = (req,res, next) => {
    try{
       if(req.user.role !== "Admin") {
        return res.status(401).json({
            success:false,
            message:'this is a protected route for admin',
        });
       }
       next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'user role is not matching',
        })

    }

}

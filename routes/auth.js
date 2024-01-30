const express = require("express");
const router = express.Router();
// const User = require("../models/user");

//import controllers
const {login,signup} = require("../controllers/auth");
//import middlewares
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup",signup);

//testing protected routes
router.get("/test", auth, (req,res)=>{
    res.json({
        success:true,
        message:'welcome to the protected routes for test',
    });
});

//student protected route
router.get("/student", auth, isStudent, (req,res)=>{
    res.json({
        success:true,
        message:'welcome to the protected routes for student',
    });
});

//protected route for admin
router.get("/admin", auth, isAdmin, (req,res)=>{
    res.json({
        success:true,
        message:'welcome to the protected routes for Admin',
    });
});

// router.get("/getEmail", auth, async (req,res) => {
//     try{
//         const id= req.user.id;
//         console.log("ID:" , id);
//         const user = await User.findById(id);

//         res.status(200).json({
//             success:true,
//             user:user,
//             message:'welcome to the email route',
//         })
//     }catch(error){
//         res.status(500).json({
//             success:false,
//            error:error.message,
//             message:'not working code',
//         })
//     }
    
// });

module.exports = router;
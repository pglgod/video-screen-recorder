


const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require("express-validator");



// User encription
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const fetchuser = require("../middleware/fetchuser");
const upload = require("../middleware/upload");


const JWT_SECRET = "KORERO";

router.post('/auth/signup', 
// [
//     body('name', 'Enter a valid name').isLength({min: 3}),
//     body('email', 'Enter a valid email').isEmail(),
//     body('password', 'password must be atleast five charecters').isLength({min: 5})
// ],
 upload.single("image"),  async (req, res)=>{
    let success;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success: success, errors : errors.array() });
    }

    try {
        let user = await User.findOne({email: req.body.email});
        if (user) {
            success = false;
            return res.status(400).json({success : success, error: "Sorry a user with this email alrady exists!" })
        }

        const salt = await bcrypt.genSalt(10);
        secpass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
            image: req.file.filename
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });



    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
});


router.post( "/auth/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password","password cannot be blank").exists()
], async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Plz Login With Correct Credential" });
        }
        const passwordCompare = bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "Plz Login With Correct Credential" });
        }

        const data = {
            user:{
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured"); 
    }
});


router.post("/auth/getuser", fetchuser, async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send( {error: "Enternal Server Error"});
    }
  });



module.exports = router;

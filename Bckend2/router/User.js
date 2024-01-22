const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser");
const multer = require('multer');

const jwt_Secret = "HassaisGoodBy";

const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../src/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ dest: 'uploads/', storage });
router.post("/Create", upload.single('image'), async (req, res) => {
    let success = false;
    const { name, email, number, password } = req.body;
    const { image } = req.file ? req.file.filename : '';
    const slat = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, slat)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: secpass,
        image: req.file ? req.file.filename : '',
    })
    const result = await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    var AuthToken = jwt.sign(data, jwt_Secret);
    success = true;
    res.json({ AuthToken })
});
// 
router.post("/Login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User Does not exist" })
        };
        const passwordCompare = bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Enter Correct Password" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        var AuthToken = jwt.sign(data, jwt_Secret);
        success = true
        res.json({ success, AuthToken });
    } catch (error) {
        console.log(error)
    }

})
//Detail of Login USer

router.get("/UserDetail", fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.log(error)
    }
});

//Find User By Id

router.get("/getProfile/:id", async (req, res) => {
    const result = await User.findOne({ _id: req.params.id }).select("-password");
    if (result) {
        res.send(result)
    } else {
        res.send("No result")
    }
});

module.exports = router
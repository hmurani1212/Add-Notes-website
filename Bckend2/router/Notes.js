const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const User = require("../models/User");
const mongoose = require('mongoose');
//Addd Notes
router.post("/CreateNotes", fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const Note = new Notes({
            title, description, tag, user: req.user.id
        })
        const result = await Note.save();
        res.json({ result })
    } catch (error) {
        console.log(error)
    }
})
router.get("/getNotes", fetchUser, async (req, res) => {
    const Note = await Notes.find({ user: req.user.id })
    res.send(Note)
});
router.get("/getNotes1", fetchUser, async (req, res) => {
    const Note = await Notes.find().populate('user')
    res.send(Note)
});
router.get("/getNotes2/:id", async (req, res) => {
    const result = await Notes.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send("No result")
    }
});
// router.get("/getNotes3/:id", async (req, res) => {
//     const result = await User.findOne({ _id: req.params.id }).select("-password");
//     if (result) {
//         res.send(result)
//     } else {
//         res.send("No result")
//     }
// });
// router.get('/getNotes3/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     try {
//         const user = await User.findById({ _id: req.params.id });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         const userNotes = await Notes.find({ user: userId });
//         res.json(userNotes);
//     } catch (err) {
//         console.error('Error retrieving user notes:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
router.get('/getNotes3/:userId', async (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userNotes = await Notes.find({ user: userId });
        res.json(userNotes);
    } catch (err) {
        console.error('Error retrieving user notes:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});







module.exports = router
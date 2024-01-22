const mongoose = require("mongoose");


const { Schema } = mongoose;


const NoteSheme = new Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    tag: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("Notes", NoteSheme)
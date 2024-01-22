const mongoose = require('mongoose');
const { Schema } = mongoose;

const NumberSheme = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    image:{
        type:String,
        require:true
    }
});


module.exports = mongoose.model("User", NumberSheme)
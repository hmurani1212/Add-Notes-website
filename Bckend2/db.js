const mongoose = require("mongoose");


const mongoUri = "mongodb://127.0.0.1:27017/NotsUser";

const ConnecttoMongo = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Succesifully Connected")
    } catch (error) {
        console.log(error)
    }
};

module.exports = ConnecttoMongo


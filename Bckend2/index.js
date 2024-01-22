const express = require("express");

const ConnecttoMongo = require("./db");
const cors = require("cors")

ConnecttoMongo();
const path= require("path")

const app = express();
app.use(express.json());
app.use(cors())
const port  =5000;


app.get("/", (req, res) =>{
res.send("Heello")
});
app.use('/image', express.static(path.join('../src/images')));
app.use("/api/vi", require("./router/User"));
app.use("/api/v2", require("./router/Notes"));

app.listen(port, () =>{
    console.log(`App is Running on ${port}`)
})


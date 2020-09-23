// ========= IMPORTS =========
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./routes/auth");
const mailRoute = require("./routes/mail");
// ========= END OF IMPORTS ==========

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/auth", authRoute);
app.use("/mail", mailRoute);

// Connecting to database and starting server
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    console.log("connected to database");
    app.listen(PORT, () => {
        console.log("server started!");
    })
})



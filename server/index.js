const express = require("express")
const app = express()
const mongodb = require("./config/db")
const multer = require("multer")
const PORT = 4000;
const Routes = require("./routes/userroutes")
const userschema = require("./controlles/register")
const cors = require("cors")
const path = require("path");


mongodb()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(

))

//just connfirm


// Static file serving configuration
app.use(
    "/static",
    express.static(path.join(__dirname, "ElearnChat/chatbot/templates"))

);


app.use("/", Routes)


// git remote add origin https://github.com/sathish-entri/Learning-Dashboard.git
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const defaultError = error.message;
    const data = error.data ? error.data : [];
    console.log('oh no', error);
    var expValidatorErr = '';
    for (let i = 0; i < data.length; i++) {
        if (data[i].value == undefined || data[i].value == null) data[i].value = "";
        expValidatorErr += ((data[i].msg == "Invalid value") ? data[i].msg + " " + data[i].value + " at " + data[i].path : data[i].msg) + ((data.length - 1 != i) ? "\n" : "");
    }
    res.status(status).json({ message: expValidatorErr ? expValidatorErr : defaultError, status: 'failed' });
});





app.listen(PORT, () => {
    console.log("port is listening")
})
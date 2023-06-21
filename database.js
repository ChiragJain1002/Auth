const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/users");

const User = new mongoose.Schema({
    username : String,
    phone : String,
    email : String,
    pass : String
});

module.exports = mongoose.model("mycolls",User);
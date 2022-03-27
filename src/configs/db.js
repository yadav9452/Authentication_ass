const mongoose = require("mongoose");

module.exports = () => {

    return mongoose.connect("mongodb+srv://yadav9452:1234@cluster0.7vr25.mongodb.net/Cluster0?retryWrites=true&w=majority");
};
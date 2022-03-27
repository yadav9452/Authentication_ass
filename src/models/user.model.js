const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});

// userSchema.pre("save",function(next){  // normal hashing or customized hashing 
//       let hashedPassword=this.password+"sercret";
//       this.password=hashedPassword;
//       return next();
// })
userSchema.pre("save", function (next) {  // normal hashing or customized hashing
    //password  salt/round MORE ROUNDS more security 
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

userSchema.methods.checkpassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("user", userSchema);

module.exports = User;
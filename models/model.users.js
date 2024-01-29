import { mongoose } from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt"
// const User = require("../models/User");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,

    },
    email: {
        type: String,
        require: true,
        unique: true  //this will check the email is already exist or not in database

    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password should be at least 8 characters'],   //here we are adding a validation to check
        select: false

    },
    avtar: {
        public_id: String,
        url: String,

    },
    verified: {
        type: Boolean,
        default: false,
    },
    otp: {
        number: Number,
        otp_expiry: Date,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10)
    this.password = bcrypt.hash(this.password, salt)
    next()

})
userSchema.method.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expireIn: process.env.JWT_COOKIES_EXPIRE*24*60*60*1000,
    })
}

userSchema.method.comparePasword= async function(password){
   return await bcrypt.compare(password,this.password);
}

export const user = mongoose.model('user', userSchema)



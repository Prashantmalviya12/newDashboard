const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = mongoose.Schema({
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    DOB: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [100, "Password cannot exceed 100 characters"],
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  UserSchema.methods.generateToken = async function () {
    try {
      return jwt.sign(
        {
          email: this.email,
        },
        process.env.JWT_SECRETE_KEY,
        {
          expiresIn: "30d",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

const User = mongoose.model("User", UserSchema);
module.exports = User;
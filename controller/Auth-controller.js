const user = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {signAccessToken} = require('../Helper/JWT_helper')

module.exports = {
  login: async (req,res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      const userExist = await user.findOne({ email });
      if (!userExist) {
        return res.status(404).json({ msg: "Email or Password did not match any existing user." });
      }
      const isMatch = await bcrypt.compare(password, userExist.password);

      console.log("isMatchhhhh", isMatch);
      if (isMatch) {
        const accessToken = await signAccessToken(userExist._id.toString());
        const clientExist = await user.findOne({ user_id: userExist._id });
        const payload = {
          id: userExist._id,
        };
        if (clientExist) {
          payload.clientId = clientExist._id;
        }
        console.log(">>>>>>>>>>", payload);
        return res.status(200).json({
          msg: "Login successful",
          token: accessToken,
          payload,

          // tokentype: "Bearer",
          // data: userExist,
        });
      } else {
        return res.status(400).json({ msg: "Invalid email or password" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },
};

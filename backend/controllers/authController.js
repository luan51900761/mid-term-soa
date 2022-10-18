const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
  register: async (req, res) => {
    console.log(req.body);
    // try {
    //   const newUser = new User({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: hashedPassword,
    //   });
    //   await newUser.save();
    //   res.status(200).json(newUser);
    // } catch (err) {
    //   return res.status(500).json({ msg: err.message });
    // }
  },
  generateToken: (user, secretKey, expires) => {
    console.log(typeof user, typeof secretKey, typeof expires);
    return jwt.sign({ id: user._id, admin: user.admin }, secretKey, {
      expiresIn: expires,
    });
  },
  //   login
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).select(
        "+password"
      );
      if (!user) return res.status(404).json({ msg: "User not found" });
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(400).json({ msg: "Wrong password" });
      const accessToken = authController.generateToken(
        user,
        process.env.JWT_SECRET,
        "20s"
      );
      refreshTokens.push(accessToken);
      const refreshToken = authController.generateToken(
        user,
        process.env.JWT_REFRESH_KEY,
        "365d"
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        maxAge: 365 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });
      const { password, ...others } = user._doc;
      return res.status(200).json({ ...others, token: accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ msg: "You are not authenticated" });
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ msg: "Your refresh token is not valid or has expired" });

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const accessToken = authController.generateToken(
        user,
        process.env.JWT_SECRET,
        "300s"
      );
      const refreshToken = authController.generateToken(
        user,
        process.env.JWT_REFRESH_KEY,
        "365d"
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        maxAge: 365 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });
      res.status(200).json({ token: accessToken });
    });
  },
  logout: function (req, res) {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookie.refreshToken
    );
    res.status(200).json({ msg: "Logged out" });
  },
};
module.exports = authController;

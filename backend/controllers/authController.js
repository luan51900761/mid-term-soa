const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let refreshTokens = [];

const authController = {
  register: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).json(newUser);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
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
      const user = await User.findOne({ username: req.body.username }).select(
        "+password"
      );
      if (!user)
        return res.status(404).json({ msg: "Không tìm thấy tài khoản!" });
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res
          .status(400)
          .json({ msg: "Tài khoản hoặc mật khẩu bạn không đúng!" });
      const accessToken = authController.generateToken(
        user,
        process.env.JWT_SECRET,
        "300s"
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
      req.user = { ...others };
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

const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const User = require("../components/models/user");
const BlacklistedToken = require("../components/models/blacklisttoken");

//@description           Auth user & get token
//@route                 POST api/v1/user/login
//@access                Public

const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message:
            "Auth failed!! either the account does't exist or you have enter invalid email id",
        });
      }
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Fail!!",
          });
        }
        if (result) {
          const token = generateToken(user[0]._id, user[0].type);
          return res.status(200).json({
            message: "Auth Successful",
            token: token,
          });
        }
        return res.status(200).json({
          message: "Auth Failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//@description           Register a new User
//@route                 POST api/v1/user/signup
//@access                Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  let type = "user";
  User.find({
    email: email,
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          Message: "Email is already exist",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              name: name,
              email: email,
              password: hash,
              type: type,
            });
            user
              .save()
              .then((result) => {
                const token = generateToken(user._id, user.type);
                res.status(201).json({
                  data: result,
                  token: token,
                  Message: "User Created Successfully",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

//@description           User Profile
//@route                 GET api/v1/user/profile
//@access                Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const userProfile = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // Check if the logged-in user is an admin
    if (req.isAdmin) {
      userProfile.isAdmin = req.isAdmin;
    }

    res.json(userProfile);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @description           Logout Function
// @route                 POST api/v1/user/logout
// @access                Private
const logOut = asyncHandler(async (req, res, next) => {
  const token = req.token;

  if (token) {
    const blacklistedToken = new BlacklistedToken({
      token: token,
    });
    await blacklistedToken.save();

    res.status(200).json({ message: "Logout successful" });
  } else {
    res.status(401).json({ message: "Unable to logout or token invalid" });
  }
});

module.exports = {
  logInUser,
  registerUser,
  getUserProfile,
  logOut,
};

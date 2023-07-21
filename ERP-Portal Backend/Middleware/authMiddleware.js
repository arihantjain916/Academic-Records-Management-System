const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../components/models/user");
const BlacklistedToken = require("../components/models/blacklisttoken");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, invalid token" });
      }
      const blacklistedToken = await BlacklistedToken.findOne({ token });

      if (blacklistedToken) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        req.token = token;
        req.user = user;

        if (user.type === "admin") {
          req.isAdmin = true;
        } else {
          req.isStudent = true;
        }

        next();
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

// module.exports = { protect };
module.exports = protect;

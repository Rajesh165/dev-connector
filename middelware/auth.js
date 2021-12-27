const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(400).json({ msg: "No token found access denied" });

  try {
    const decoded = jwt.verify(token, "rajesh");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token exires" });
  }
};
module.exports = auth;

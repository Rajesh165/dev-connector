const bcryptjs = require("bcryptjs");
const express = require("express");
const auth = require("../../middelware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();

// @route get api/auth
// desc private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
// @route post api/users
// desc public

router.post(
  "/",
  [
    check("email", "enter a va;id email").isEmail(),
    check("password", "enter at least 6 character").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ errors: [{ msg: "No user found" }] });

      //   console.log("avata is ", avatar);
      const isMatched = await bcryptjs.compare(password, user.password);
      if (!isMatched)
        return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, "rajesh", { expiresIn: 3600000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
      //   res.send("users registered");
    } catch (err) {
      console.log(err.message);
      res.status(400).send("server error");
    }
  }
);

module.exports = router;

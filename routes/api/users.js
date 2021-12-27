const bcryptjs = require("bcryptjs");
const express = require("express");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const router = express.Router();

// @route post api/users
// desc public

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "enter a va;id email").isEmail(),
    check("password", "enter at least 6 character").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exist" }] });

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      //   console.log("avata is ", avatar);
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);
      await user.save();
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

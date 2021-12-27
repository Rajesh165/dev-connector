const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middelware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const router = express.Router();

// @route get api/profile/me
// desc private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile)
      return res
        .status(400)
        .json({ errors: [{ msg: "no user profile exist" }] });
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server error");
  }
});

router.post(
  "/",
  [
    auth,
    check("status", "status is requires").not().isEmpty(),
    check("skills", "skills required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      twitter,
      youtube,
      facebook,
      linkedin,
      instagram,
    } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills)
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    console.log(profileFields.skills);

    // build social profile object

    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.status(201).json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.send(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
    res.send("hello");
  }
);

// -------------get all user profiles-----------------
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//-----------------get user profile by user id----------------
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile)
      return res
        .status(200)
        .json({ msg: "there is no user exist for this id" });
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res
        .status(200)
        .json({ msg: "there is no user exist for this id" });
    res.status(500).send("server error");
  }
});

//------------delete user profile----------

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.send("user deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//---------------------add experiences-------------
router.put(
  "/experiences",
  [
    auth,
    check("title", "title is required").not().isEmpty(),
    check("company", "company is required").not().isEmpty(),
    check("from", "is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors });
    const { title, company, location, from, to, current, description } =
      req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.send(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//-----------delete expericences------------

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const remIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(remIndex, 1);
    await profile.save();
    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//---------------------add education-------------
router.put(
  "/education",
  [
    auth,
    check("school", "school is required").not().isEmpty(),
    check("degree", "degree is required").not().isEmpty(),
    check("fieldofstudy", "fieldofstudy is required").not().isEmpty(),
    check("from", "is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors });
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newExp = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newExp);
      await profile.save();
      res.send(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//-----------delete education------------

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const remIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(remIndex, 1);
    await profile.save();
    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;

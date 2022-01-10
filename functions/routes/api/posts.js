const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middelware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");

const router = express.Router();

// @route get api/posts
// desc private

//--------------------create a post-----------------
router.post(
  "/",
  [auth, check("text", "text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    try {
      const user = await User.findById(req.user.id);
      const post = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      await post.save();
      res.send(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//---------------------- get all the posts-------------
router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    res.send(post);
  } catch (err) {
    console.log(err.message);
    res.send("server error");
  }
});

//-----------get post by id----------
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json({ msg: "post not found" });
    res.send(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "objectId")
      return res.status(400).json({ msg: "no post found" });
    res.send("server error");
  }
});

//-----------delete post by id----------
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json({ msg: "post not found" });
    if (post.id.toString() !== req.params.id)
      return res.status(400).json({ msg: "not a valid user" });
    await post.remove();
    res.send("post deleted");
  } catch (err) {
    console.log(err.message);
    if (err.kind == "objectId") res.send("no post found");
    res.send("server error");
  }
});

//--------------------------like a post by id -----------
router.put("/likes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if post already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res.status(500).json({ msg: "post already liked" });
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.send(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//--------------------------unlike a post by id -----------
router.put("/unlikes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if post already liked
    // console.log(post);
    if (post.likes.filter((like) => like.user === req.user.id).length === 0) {
      return res.status(500).json({ msg: "post not liked yet" });
    }
    const remIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(remIndex, 1);

    await post.save();
    res.send(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//--------------------create a post-----------------
router.post(
  "/comment/:id",
  [auth, check("text", "text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.send(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//-----------delete comment by id----------
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id == req.params.comment_id
    );
    if (!comment) return res.status(400).json({ msg: "comment not found" });
    if (comment.user.toString() !== req.user.id)
      return res.status(400).json({ msg: "not a valid user" });
    const remIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(remIndex, 1);
    await post.remove();
    res.status(200).json(post.comments);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "objectId") res.send("no post found");
    res.send("server error");
  }
});
module.exports = router;

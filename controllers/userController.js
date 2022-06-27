const express = require("express");
const router = express.Router();
const User = require("../models/Users")
const jwt = require("jsonwebtoken");
const Trip = require("../models/Trip")
const Post = require("../models/Post")

const verifyToken = (req, res, next) => {
  try {
    const authToken = req.headers.token;

    // validate the token
    const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);
    console.log("DECODED",decoded)
    // if valid, retrieve the username from the token
    const username = decoded.data;

    req.user = username;

    next();
  } catch (error) {
    res.redirect('/intro');
  }
};

router.get("/seed", async (req,res) => {
    const userDetails = [
        {
          username: "Joy Kwok",
          email: "hi123@gmail.com",
          password: "88888",
        },
        {
          username: "Ivan Leong",
          email: "hi345@gmail.com",
          password: "88888",
        },
      ];
      await User.deleteMany({});
      await User.insertMany(userDetails);
      res.json(userDetails);
});

router.post("/register", async (req, res) => {
    const body = req.body;

    const createdUser = await User.create(req.body);
    // const salt = await bcrypt.genSalt(10);
    createdUser.save().then(() => res.status(200).send("Success"));

})

router.post("/login", async (req, res) => {
    console.log("body", req.body);
    const { username, password } = req.body;
    const findUserName = await User.findOne({ username: req.body.username });
    console.log("username found",findUserName) 
    try {
      if (password === findUserName.password) {
        //authenticate and create the jwt
        const newToken = jwt.sign(
          {
            user: username,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: 60 * 60 }
        );
    
        res
           .status(200)
           .cookie("NewCookie", newToken, { path: "/" , httpOnly: true })
           .send({"jwt":newToken})
      } else {
        res.status(403).send({"unauthorised":"unauthorised"});
      }
    } catch (error) {
      res.send({"unauthorised":"unauthorised"})
    }
    
  });

router.get("/get-user-profile-info", verifyToken, async (req, res) => {
  const userDetails = await User.find({ username: req.headers.username});
  console.log("user details found",req.headers.username,userDetails)
  res.status(200).send({userDetails});
});

//Delete route
router.delete("/delete/:username", async (req, res) => {
  const deletedUser = await User.findOneAndDelete({
    username: req.params.username,
  });

  const deletedTrips = await Trip.findOneAndDelete({
    username: req.params.username,
  });

  const deletedPost = await Post.findOneAndDelete({
    username: req.params.username,
  });

  res.send({"deletedSuccess":"deletedSuccess"})
});

module.exports = router;
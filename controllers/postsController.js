const express = require("express");
const router = express.Router();
const Post = require("../models/Post")
const jwt = require("jsonwebtoken");
const fs = require("fs");
const uploadController = require("./fileUploadController");
const TripNecessities = require("../models/TripNecessities")

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
      const postDetails = [
            {
                tripIndex : 1,
                postTitle : "Happy day at ala restaurant",
                postDate : "2022-06-02",
                postBody: "a wonderous tour of the world",
                username : "Michael",
                //formGridThumbnailUrl : "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                publicPrivate : true
            },
            {
                tripIndex : 1,
                postTitle : "Excited day at ala restaurant",
                postDate : "2022-06-01",
                postBody: "a wonderous tour of the world",
                username : "Michael",
                //formGridThumbnailUrl : "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                publicPrivate : true
            },
        ];
        const deletedPosts = await Post.deleteMany({});
        const createdPosts = await Post.insertMany(postDetails);
        res.json(createdPosts);
  });

router.post("/create-post", verifyToken, async (req, res) => {
// create neccesitites table with create trp index.
    const newPost = {
        tripIndex: req.body.tripIndex,
        postTitle : req.body.postTitle,
        postDate : req.body.postDate,
        postBody : req.body.postBody,
        username : req.body.username,
        file:  req.body.file,
        location: req.body.location,
        public : req.body.public,
    };
    try {
        const createdPost = await Post.create(newPost);
        createdPost.save().then(() => res.status(200).send({"newPost":newPost}));
        console.log("new-trip post created", newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/get-user-posts", verifyToken, async (req, res) => {
    // create neccesitites table with create trp index.
    const userPosts = await Post.find({tripIndex:req.headers.tripindex});
    console.log("trip index fed",req.headers.tripindex)
    console.log("user trips found");
    res.status(200).send({userPosts});
    });

router.get("/get-public-posts", verifyToken, async (req, res) => {
    // create neccesitites table with create trp index.
    const publicPosts = await Post.find({public:true});
    console.log("public trips found",publicPosts)
    console.log("user trips found");
    res.status(200).send({publicPosts});
    });

router.get("/get-all-user-post-images", verifyToken, async (req, res) => {
    // create neccesitites table with create trp index.
    const allUserPosts = await Post.find({username:req.headers.username});
    const userImageArray = []
    allUserPosts.map((post)=>{
        userImageArray.push({
            "file":post.file,
            "postTitle": post.postTitle,
            "postBody": post.postBody
        })
    })
    console.log("all user post images found",userImageArray)
    res.status(200).send({userImageArray});
    });


router.post("/write-comment", verifyToken, async (req, res) => {
    // create neccesitites table with create trp index.
        const updatePost = {
            ...req.body
        };
        try {
            const updatedPost = await Post.findOneAndUpdate(
                {postTitle:updatePost.postTitle},
                {...updatePost},
                {new:true}
                );
                updatedPost.save().then(() => res.status(200).send({updatedPost}));
            console.log("updated post", updatedPost);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

module.exports = router;
require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const path = require("path")
const app = express();
const PORT = process.env.PORT ?? 4000;
const mongoURI = process.env.MONGO_URI;

// const db = mongoose.connection;

mongoose.connect(mongoURI, {}, () => {
    console.log("Connected~")
})

app.use(express.json());
app.use(express.static("./frontend/build"))

app.get("/api/hi", (req, res) => {
  res.json({ msg: "Hello World" });
});

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

app.post("/api/posts", verifyToken, (req, res) => {
  const username = jwt.verify(req.headers.token, process.env.TOKEN_SECRET).user;
  console.log("USERNAME",username)
  //const userTransactions = transactions[username];
  //res.status(200).json({ transactions: userTransactions });
  res.status(200).json({ 'username': username });
});

app.post("/api/logout", (req,res) => {
    res.clearCookie("NewCookie").send("cookie dead");
});



app.get("/*", (req,res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
})

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});

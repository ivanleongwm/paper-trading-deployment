// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const session = require("express-session");
const { find, create } = require("../models/Users");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const StockHoldings = require("../models/StockHolding");
const PieChart = require("../models/PieChart");
const router = express.Router();

// const saltRounds = 10;
// router.get("/seed", async (req, res) => {
//     try {
//         await User.deleteMany({})
//         await User.create([
//           {
//             username: "simon",
//             password: bcrypt.hashSync("12345", saltRounds),
//           },
//           {
//             username: "admin",
//             password: bcrypt.hashSync("88888", saltRounds),
//           },
//         ]);
//         res.send("Seed")
//       } catch (error) {
//           console.log(error);
//       }
// })

const isAuthenticated = (req, res, next) => {
  console.log("isAuth Session obj:", req.params.username);
  if (req.params.username) {
    next();
  } else {
    res.status(200).send("Sorry you have no access.");
  }
};

//? secret
router.get("/loginsuccessful/:username", isAuthenticated, async (req, res) => {
  //console.log(req.session.currentUser);
  console.log(req.params.username)
  const findUserData = await StockHoldings.findOne({
    username: req.params.username,
  }); //req.body.username
  res.json(findUserData);
});

router.get("/seed", async (req, res) => {
  const userDetails = [
    {
      username: "Joy Kwok",
      email: "hi123@gmail.com",
      password: bcrypt.hashSync("88888", saltRounds),
    },
    {
      username: "Ivan Leong",
      email: "hi345@gmail.com",
      password: bcrypt.hashSync("88888", saltRounds),
    },
  ];
  await User.deleteMany({});
  await User.insertMany(userDetails);
  res.json(userDetails);
});

// =======================================
//              ROUTES
// =======================================
//Index route
router.get("/", (req, res) => {
  User.find()
    .then((userDetails) => {
      res.json(userDetails);
    })
    .catch((err) => {
      res.json(err);
    });
});

// //* login route
// router.post("/login", async (req, res) => {
//     const { username, password} = req.body;
//     // const hashPassword = bcrypt.hashSync(password, saltRounds);
//     const user = await User.findOne({ username });

//     if (!user) {
//         res.send("User not found");
//     } else if (bcrypt.compareSync(password, user.password)) {
//       req.session.user = user;
//       req.session.count = 1;
//       res.send("Ok");
//     } else {
//       res.send("No")
//     }

//   // res.send(user);
//   //* success or failure
// });

const saltRounds = 10;
//Create route for register
router.post("/register/:username", async (req, res) => {
  const body = req.body;
  console.log("body", body);
  try {
    console.log(body);
    const createdUser = await User.create(req.body);
    // const salt = await bcrypt.genSalt(10);
    createdUser.password = await bcrypt.hashSync(
      createdUser.password,
      saltRounds
    );
    createdUser.save().then(() => res.status(200).send("Success"));

    const createdStockHoldings = await StockHoldings.create(
      {
        username: req.params.username,
        purchaseLog: [],
        cashBalance: 10000,
        stockBalance: [],
      }
    );
    createdStockHoldings.save()

    const newColours = await PieChart.create(
      {
          username: req.params.username,
          colour1: "#8884D8",
          colour2: "#FF00FB",
          colour3: "#F2FF00",
          colour4: "#FFA200",
          colour5: "#A4DE6C",
          colour6: "#D0ED57",
        },
    );
    newColours.save()
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//const stockHoldings = await StockHoldings.create(req.body)

//Create route for login
router.post("/login", async (req, res) => {
  console.log("body", req.body);
  try {
    const findUserName = await User.findOne({ username: req.body.username }); //req.body.username
    console.log("findUsername", findUserName);
    if (findUserName) {
      const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(
        req.body.password,
        findUserName.password
      );
      console.log("valid password", validPassword);
      // const validPassword = await bcrypt.compare("TEST", bcrypt.hashSync("TEST",bcrypt.genSaltSync(10)));

      if (validPassword) {
        req.session.currentUser = findUserName.username;
        req.session.isAuthenticated = true;
        req.session.count = 1;
        console.log(req.session);
        //   res.redirect("/")
        res.status(200).json({ message: "Valid password", session: req.session });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }

    console.log(findUserName);
  } catch (error) {
    console.log(error);
  }
});

//Create route for new user stock holdings
router.post("/newUser/:username", async (req, res) => {
  try {
    const createdStockHoldings = await StockHoldings.create(
      {
        username: req.params.username,
        purchaseLog: [],
        cashBalance: 10000,
        stockBalance: [],
      }
    );
    createdStockHoldings.save().then(() => res.status(200).send("Success"));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete route
router.delete("/:username", async (req, res) => {
  const deletedUser = await User.findOneAndDelete({
    username: req.params.username,
  });

  const deletedColour = await PieChart.findOneAndDelete({
    username: req.params.username,
  });

  const deletedHoldings = await StockHoldings.findOneAndDelete({
    username: req.params.username,
  });

  res.json(deletedUser);
});

// router.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.send("logout")
// })

module.exports = router;

// router.get("/secret", (req, res) => {
//     const user = req.session.user;

//     if (user) {

//       res.send(user)
//     } else {
//       res.send("no entry")
//     }
// })

// router.get("/secret2", (req, res) => {
//   const count = req.session.count;
//   req.session.count = req.session.count + 1;
//   res.send("count" + count)
// })

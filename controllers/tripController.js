const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip")
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

const TripThings = {
  tripIndex : 1,
  things : {
      essentials : {
        "medications" : [1,false],
        "passport" : [1,false],
        "visa" : [1,false],
        "wallet" : [1,false],
        "water bottle" : [1,false]
    },
    accessories : {
        "belt" : [1,false],
        "sunglasses" : [1,false],
        "watch" : [1,false],
        "cap" : [1,false]
    },
    footwear : {
        "hiking shoes" : [1,false],
        "sandals" : [1,false],
        "shoes" : [1,false],
        "socks" : [1,false]
    },
    toiletries : {
        "floss" : [1,false],
        "mouth wash" : [1,false],
        "tooth paste" : [1,false],
        "towel" : [1,false]
    }
  }
}

router.get("/seed", async (req,res) => {
    const tripDetails = [
        {
            tripIndex: 1,
            location: "Korea",
            username: "Michael",
            startDate: "2022-05-30",
            endDate: "2022-06-15",
            title: "holiday tour",
            thumbnail: "https://images.unsplash.com/photo-1545670584-7d9ae6de4b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            description: "A relaxing tour in korea",
            photos: ["https://images.unsplash.com/photo-1545670584-7d9ae6de4b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                        "https://images.unsplash.com/photo-1549221428-3f4410ea193a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"],
            public: true,
        },
        {
            tripIndex: 2,
            location: "Taiwan",
            username: "Michael",
            startDate: "2022-06-31",
            endDate: "2022-07-15",
            title: "school expedition",
            thumbnail: "https://images.unsplash.com/photo-1545670584-7d9ae6de4b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            description: "the first school trip abroad with my friends",
            photos: ["https://images.unsplash.com/photo-1545670584-7d9ae6de4b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                        "https://images.unsplash.com/photo-1549221428-3f4410ea193a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"],
            public: false,
        },
      ];
      await Trip.deleteMany({});
      await Trip.insertMany(tripDetails);
      await TripNecessities.deleteMany({});
      await TripNecessities.insertMany(TripThings);
      res.json(TripThings);
});

router.get("/get-user-trips", verifyToken, async (req, res) => {
  const userTrips = await Trip.find({ username: req.headers.username});
  console.log("user trips found",req.headers.username,userTrips)
  res.status(200).send(userTrips);
});

router.post("/create-trip", verifyToken, async (req, res) => {
  // create neccesitites table with create trp index.
  const newTrip = {
    tripIndex: req.body.tripIndex,
    username : req.body.username,
    location : req.body.formGridLocation,
    startDate : req.body.formGridStartDate,
    endDate : req.body.formGridEndDate,
    title : req.body.formGridActivityTitle,
    thumbnail : req.body.formGridThumbnailUrl,
    description : req.body.formGridBriefDescription,
    public: req.body.formGridCheckbox
  };
  try {
    const createdTrip = await Trip.create(newTrip);
    await TripNecessities.insertMany({...TripThings, "tripIndex":req.body.tripIndex});
    createdTrip.save().then(() => res.status(200).send("Success"));
    console.log("new-trip object created", newTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/get-single-trip-data/:id", verifyToken, async (req, res) => {
    const singleTripDetail = await Trip.findOne({ tripIndex: req.params.id});
    const singleTripNecessities = await TripNecessities.findOne({tripIndex: req.params.id})
    console.log("trip details found",singleTripDetail)
    console.log("trip necessities found",singleTripNecessities)
    res.status(200).send({singleTripDetail,singleTripNecessities});
  });

router.post("/update-single-trip-data/:id", verifyToken, async (req, res) => {
  console.log("test",req.body)
  const deletedTripDetails = await TripNecessities.deleteOne({ tripIndex: req.params.id})
  const updatedTripDetails = await TripNecessities.insertMany(req.body)
  //
  console.log("trip necessities updated",updatedTripDetails)
  res.status(200).send({updatedTripDetails});
  /*
  const singleTripDetail = await Trip.findOne({ tripIndex: req.params.id});
  const singleTripNecessities = await TripNecessities.findOne({tripIndex: req.params.id})
  console.log("trip details found",singleTripDetail)
  */
});
/*
User.update({'Id':response.Id}, {$set:{
      'Firstname':response.Fname,
      'Age' : response.age,
      'Lastname' : response.Lname,
      'DateOfBirth' : response.dob,
      'PlaceOfBirth' : response.pob,
      'Months' : response.month,
      'Nationality' : response.nation,
      'MotherTongue' : response.mothertongue,
      'BloodGroup' : response.bloodgroup,
      'Father.Firstname' : response.fatherfname,
      'Father.Lastname' : response.fatherlname,
      'Father.Occupation' : response.occupation,
      'Father.PlaceOfWork' : response.placeofwork,
      'Father.OfficialAddress' : response.officaladd,
      'Father.EmailId' : response.emailid,
      'Father.PhoneNo' : response.phoneno,
      'Father.MobileNo' : response.mobileno,
      'Mother.Firstname' : response.motherfname,
      'Mother.Lastname' : response.motherlname,
    */


module.exports = router;
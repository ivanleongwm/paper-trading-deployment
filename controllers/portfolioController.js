// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const StocksHistory = require("../models/StocksHistory");
const StockDetails = require("../models/StockDetails");
const router = express.Router();

// =======================================
//              ROUTES
// =======================================
//Index route

router.get("/portfolio", async (req, res) => {

      res.json();
    })
    .catch((err) => {
      res.json(err);
    });

module.exports = router;

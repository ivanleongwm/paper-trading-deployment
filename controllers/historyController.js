// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const StocksHistory = require("../models/StocksHistory");
const router = express.Router();
const StockDetails = require("../models/StockDetails")

router.get("/seed", async (req, res) => {
  // const stocksHistory = [
  //   // { date: "2021-02-22", ticker: "AAPL", quantity: 3, salesPrice: 15 },
  //   // { date: "2021-02-28", ticker: "GOOGL", quantity: 25, salesPrice: 100 },
  // ];
  await StocksHistory.deleteMany({});
  await StocksHistory.insertMany(StockDetails);
  // await StocksHistory.insertMany(stocksHistory);
  res.json(StockDetails);
});

// =======================================
//              ROUTES
// =======================================
//Index route
router.get("/", (req, res) => {
  StocksHistory.find()
    .then((stocksHistory) => {
      res.json(stocksHistory);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

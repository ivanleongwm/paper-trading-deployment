// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const StockHolding = require("../models/StockHolding");
const router = express.Router();

router.get("/seed", async (req, res) => {
  const stockHolding = [
    {
      username: "Joy Kwok",
      purchaseLog: [
        {
          date: "2022-04-15",
          ticker: "AAPL",
          quantity: 3,
          purchasePrice: 50,
        },
        {
          date: "2022-04-15",
          ticker: "GOOGL",
          quantity: 5,
          purchasePrice: 200,
        },
      ],
      salesLog: [
        {
          date: "2022-04-15",
          ticker: "AAPL",
          quantity: 1,
          purchasePrice: 60,
        },
        {
          date: "2022-04-15",
          ticker: "GOOGL",
          quantity: 5,
          purchasePrice: 500,
        },
      ],
      cashBalance: 10000,
      stockBalance: [
        {
          ticker: "AAPL",
          quantity: 3,
        },
        {
          ticker: "GOOGL",
          quantity: 5,
        },
      ],
    },
    {
      username: "Ivan Leong",
      purchaseLog: [
        {
          date: "2022-04-15",
          ticker: "AMZN",
          quantity: 10,
          purchasePrice: 888,
        },
        {
          date: "2022-04-15",
          ticker: "AAPL",
          quantity: 10,
          purchasePrice: 50,
        },
      ],
      salesLog: [
        {
          date: "2022-04-15",
          ticker: "AMZN",
          quantity: 1,
          purchasePrice: 999,
        },
        {
          date: "2022-04-15",
          ticker: "AAPL",
          quantity: 5,
          purchasePrice: 200,
        },
      ],
      cashBalance: 10000,
      stockBalance: [
        {
          ticker: "AMZN",
          quantity: 10,
        },
        {
          ticker: "AAPL",
          quantity: 10,
        },
      ],
    },
  ];
  await StockHolding.deleteMany({});
  await StockHolding.insertMany(stockHolding);
  res.json(stockHolding);
});

// =======================================
//              ROUTES
// =======================================
//Index route
router.get("/", (req, res) => {
  StockHolding.find()
    .then((stockHolding) => {
      res.json(stockHolding);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Post route
router.post("/buyStocks", async (req, res) => {
  console.log("body", req.body);
  try {
    const buyStocks = await StockHolding.create(req.body);
    res.status(200).send(buyStocks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Update route for purchase log
router.put("/updatedPurchaseLog/:username", async (req, res) => {
  const updatedPurchaseLog = await StockHolding.findOneAndUpdate(
    { username: req.params.username },
    { $push: { purchaseLog: req.body.purchaseLog } }
  );
  // res.json({ message: "Buy Updated" });
  res.json(updatedPurchaseLog);
});

//Update route for sale log
router.put("/updatedSalesLog/:username", async (req, res) => {
    const updatedSalesLog = await StockHolding.findOneAndUpdate(
      { username: req.params.username },
      { $push: { salesLog: req.body.salesLog } }
    );
    // res.json({ message: "Buy Updated" });
    res.json(updatedSalesLog);
  });

//Update route for stock balance
router.put("/updatedStockBalance/:username", async (req, res) => {
  const updatedStockBalance = await StockHolding.findOneAndUpdate(
    { username: req.params.username }, req.body
  );
  // res.json({ message: "Buy Updated" });
  res.json(updatedStockBalance);
});

//Update route for cash balance
router.put("/updatedCashBalance/:username", async (req, res) => {
    const updatedCashBalance = await StockHolding.findOneAndUpdate(
      { username: req.params.username },
      { $push: { cashBalance: req.body.cashBalance } }
    );
    // res.json({ message: "Buy Updated" });
    res.json(updatedCashBalance);
  });

//Delete route
router.delete("/deleteUser/:username", async (req, res) => {
    const deletedHoldings = await StockHolding.findOneAndDelete({
      username: req.params.username,
    });
    res.json(deletedHoldings);
  });
  

module.exports = router;

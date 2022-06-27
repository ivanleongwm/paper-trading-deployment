const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const holdingSchema = new Schema({
  // name: {type: String, required: false},
  username: { type: String, required: false },
  purchaseLog: [
    {
      date: { type: Date, required: false },
      ticker: { type: String, required: false },
      quantity: { type: Number, required: false },
      purchasePrice: { type: Number, required: false },
    },
  ],
  salesLog: [
    {
      date: { type: Date, required: false },
      ticker: { type: String, required: false },
      quantity: { type: Number, required: false },
      purchasePrice: { type: Number, required: false },
    },
  ],
  cashBalance: {type: Number, required: false},
  stockBalance: [
    {
      ticker: { type: String, required: false },
      quantity: { type: Number, required: false },
    },
  ],
});

const stockHoldings = mongoose.model("stock-holdings", holdingSchema);

module.exports = stockHoldings;

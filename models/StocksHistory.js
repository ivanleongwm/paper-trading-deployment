const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    symbol: {type: String, required: false},
    historical : [{
        date : Date,
        close : Number,
         }]
});

const stocksHistory = mongoose.model("stocks-history", historySchema);

module.exports = stocksHistory;

// [{date: '2021-12-20', price: 22}, {date: '2021-12-20', price: 22}]
// ownedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
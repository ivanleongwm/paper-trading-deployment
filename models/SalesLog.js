const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    date: {type: Date, required: false},
    ticker: {type: String, required: false},
    quantity: {type: Number, required: false},
    salesPrice: {type: Number, required: false},
});

const salesLog = mongoose.model("sales-log", salesSchema);

module.exports = salesLog;

// [{date: '2021-02-22'; ticker: 'AAPL', quantity: 3, salesPrice: 15},
// {date: '2021-02-28'; ticker: 'GOOGL', quantity: 25, salesPrice: 100}]

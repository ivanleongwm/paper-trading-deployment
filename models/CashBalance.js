const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cashBalanceSchema = new Schema({
    date: {type: Date, required: false},
    cash: {type: Number, required: false},
});

const cashBalance = mongoose.model("cash-balance", cashBalanceSchema);

module.exports = cashBalance;

// [{date: '2021-02-01', cash: 5000},
// {date:'2021-02-02',cash:6000},
// {date:'2021-02-03', cash:7000}]

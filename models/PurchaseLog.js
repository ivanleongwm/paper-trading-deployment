const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({ 
    
    // username:{type: Number, required: false}, 
    date: {type: Date, required: false},
    ticker: {type: String, required: false},
    quantity: {type: Number, required: false},
    purchasePrice: {type: Number, required: false},
});

const purchaseLog = mongoose.model("purchase-log", purchaseSchema);

module.exports = purchaseLog;

// [{date: '2021-01-22'; ticker: 'AAPL', quantity: 3, purchasePrice: 5},
// {date: '2021-01-28'; ticker: 'GOOGL', quantity: 25, purchasePrice: 51}]

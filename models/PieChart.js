const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pieChartColours = new Schema({ 
    
    // username:{type: Number, required: false}, 
    username: {type: String},
    colour1: {type: String},
    colour2: {type: String},
    colour3: {type: String},
    colour4: {type: String},
    colour5: {type: String},
    colour6: {type: String}

});

const pieChart = mongoose.model("pie-chart", pieChartColours);

module.exports = pieChart;

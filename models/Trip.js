const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    tripIndex: {type: Number, required: false},
    username: {type: String, required: false},
    location: {type: String, required: false},
    startDate: {type: Date, required: false},
    endDate: {type: Date, required: false},
    title: {type: String, required: false},
    thumbnail: {type: String, required: false},
    description: {type: String, required: false},
    photos: [String],
    public: {type: Boolean, required: false}
});

const Trip = mongoose.model("trip-details", tripSchema);

module.exports = Trip;
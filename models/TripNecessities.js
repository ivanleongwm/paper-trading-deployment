const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const necessitiesSchema = new Schema({
    tripIndex: {type: Number, required: false},
    things: {}
});

const TripNecessities = mongoose.model("trip-necessities", necessitiesSchema);

module.exports = TripNecessities;

/*
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const AddressSchema = mongoose.Schema({
  city: String,
  street: String,
  houseNumber: String,
});

const categorySchema = mongoose.Schema({
  tel: [Number],
  email: [String],
  address: {
    type: AddressSchema,
    required: true,
  },
});

const CustomerSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  company: String,
  connectInfo: ContactInfoSchema,
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);
*/
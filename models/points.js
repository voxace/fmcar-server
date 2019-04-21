const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PointsSchema = new Schema({
  type: String,
  values: [Number]
});

const Points = mongoose.model("Points", PointsSchema);

module.exports = Points;

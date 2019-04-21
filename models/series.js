const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  name: String,
  banner: String,
  logo: String,
  year: Number,
  season: Number
});

const Series = mongoose.model("Series", SeriesSchema);

module.exports = Series;

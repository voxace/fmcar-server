const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  name: { type: String, unique: true, required: true },
  banner: String,
  logo: String,
  year: { type: Number, unique: true, required: true },
  season: { type: Number, unique: true, required: true }
});

const Series = mongoose.model("Series", SeriesSchema);

module.exports = Series;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  name: { type: String, unique: true, required: true },
  banner: String,
  logo: String,
  year: { type: Number, required: true },
  season: { type: Number, default: 1, required: true },
  game: { type: Schema.Types.ObjectId, ref: 'Game' }
});

const Series = mongoose.model("Series", SeriesSchema);

module.exports = Series;

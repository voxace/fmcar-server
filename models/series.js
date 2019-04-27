const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  name: { type: String, unique: true, required: true },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  seasons: [{ type: Schema.Types.ObjectId, ref: 'Season' }],
  year: { type: Number, required: true },
  banner: String,
  logo: String
});

const Series = mongoose.model("Series", SeriesSchema);

module.exports = Series;

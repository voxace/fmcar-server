const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  name: { type: String, unique: true, required: true },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  races: [{ type: Schema.Types.ObjectId, ref: 'Race' }],
  season: { type: Number, default: 1, required: true },
  year: { type: Number, required: true },
  banner: String,
  logo: String
});

const Series = mongoose.model("Series", SeriesSchema);

module.exports = Series;

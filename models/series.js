const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  name: { type: String, unique: true, required: true },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  seasons: [{ type: Schema.Types.ObjectId, ref: 'Season' }],
  year: { type: Number, required: true },
  pointsTables: [{ type: Schema.Types.ObjectId, required: true, ref: 'Points' }],
  carChoices: [{
    _id: false,
    car: String,
    limit: Number,
  }],
  raceTypes: [{
    _id: false,
    name: String,
    description: String,
  }],
  banner: String,
  logo: String
});

const Series = mongoose.model("Series", SeriesSchema);

module.exports = Series;

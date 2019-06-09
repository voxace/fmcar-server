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
  roundTypes: [{
    _id: false,
    name: String,
    description: String,
  }],
  banner: String,
  logo: String,
  dropRound: { type: Boolean, default: false },
});

const Series = mongoose.model("Series", SeriesSchema);

module.exports = Series;


/* TODO:
* Put seasons back the way it was
* Then try to get rounds / sessions working
* Maybe make sessions separate unless I can populate the points table
*/

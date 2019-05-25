const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RaceSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, required: true, ref: 'Series' },
    season: { type: Schema.Types.ObjectId, required: true, ref: 'Season' },
    pointsTable: { type: Schema.Types.ObjectId, required: true, ref: 'Points' },
    track: { type: Schema.Types.ObjectId, required: true, ref: 'Track' },
    round: Number,
    number: Number,
    date: String,
    type: String,
    configuration: String,
    laps: Number,
    results: [{ type: Schema.Types.ObjectId, ref: 'Result' }]
  }
);

const Race = mongoose.model("Race", RaceSchema);

module.exports = Race;

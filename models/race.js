const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RaceSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, required: true, ref: 'Series' },
    pointsTable: { type: Schema.Types.ObjectId, required: true, ref: 'Points' },
    track: { type: Schema.Types.ObjectId, required: true, ref: 'Track' },
    round: Number,
    number: Number,
    date: Date,
    type: String,
    configuration: String,
    results: [{ type: Schema.Types.ObjectId, ref: 'Result' }]
  }
);

const Race = mongoose.model("Race", RaceSchema);

module.exports = Race;

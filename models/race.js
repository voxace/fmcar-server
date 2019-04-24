const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RaceSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, required: true, ref: 'Series' },
    pointsType: { type: Schema.Types.ObjectId, required: true, ref: 'Points' },
    date: Date,
    type: String,
    configuration: String, 
    number: Number,
    round: Number,
    track: String,
    results: [{ type: Schema.Types.ObjectId, ref: 'Result' }]
  }
);

const Race = mongoose.model("Race", RaceSchema);

module.exports = Race;

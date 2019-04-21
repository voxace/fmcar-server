const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RaceSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, required: true, ref: 'Series' },
    pointsType: { type: Schema.Types.ObjectId, required: true, ref: 'Points' },
    type: String,
    configuration: String, 
    number: Number,
    round: Number,
    track: String
  }
);

const Race = mongoose.model("Race", RaceSchema);

module.exports = Race;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoundSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, required: true, ref: 'Series' },
    season: { type: Schema.Types.ObjectId, required: true, ref: 'Season' },
    track: { type: Schema.Types.ObjectId, required: true, ref: 'Track' },
    round: Number,
    roundType: String,
    configuration: String,
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }] 
  }
);

const Round = mongoose.model("Round", RoundSchema);

module.exports = Round;

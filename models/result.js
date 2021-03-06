const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, required: true, ref: 'Series' },
    season: { type: Schema.Types.ObjectId, required: true, ref: 'Season' },
    round : { type: Schema.Types.ObjectId, required: true, ref: 'Round' },
    session : { type: Schema.Types.ObjectId, required: true, ref: 'Session' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    team: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },   
    position: Number,
    raceTime: String,
    fastestLap: String,
    penalty: String,
  }
);

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;
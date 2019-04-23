const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    race: { type: Schema.Types.ObjectId, required: true, ref: 'Race' },
    pointsType: { type: Schema.Types.ObjectId, required: true, ref: 'Points' },
    raceType: String,
    position: Number,
    lapTime_h: Number,
    lapTime_m: Number,
    lapTime_s: Number,
    lapTime_ms: Number
  }
);

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;

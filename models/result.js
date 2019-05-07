const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    team: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },
    race: { type: Schema.Types.ObjectId, required: true, ref: 'Race' },
    series: { type: Schema.Types.ObjectId, required: true, ref: 'Series' },
    season: { type: Schema.Types.ObjectId, required: true, ref: 'Season' },
    car: String,
    raceType: String,
    position: Number,
    raceTime: Number,
    fastestLap: {
      minutes: Number,
      seconds: Number,
      millis: Number
    }
  }
);

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;

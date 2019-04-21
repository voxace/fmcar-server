const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    race_id: { type: Schema.Types.ObjectId, required: true, ref: 'Race' },
    lapTime: Number,
    raceType: String,
    position: Number
  }
);

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;

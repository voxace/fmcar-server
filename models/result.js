const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
    race_id: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' },
    lapTime: { type: Schema.Types.ObjectId, required: true, ref: 'Period' },
    raceType: String,
    position: Number
  }
);

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;

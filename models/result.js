const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    team: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },
    session: { type: Schema.Types.ObjectId, required: true },
    series: { type: Schema.Types.ObjectId, required: true, ref: 'Series' },
    season: { type: Schema.Types.ObjectId, required: true, ref: 'Season' },
    position: Number,
  }
);

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, required: true, ref: 'Series' },
    season: { type: Schema.Types.ObjectId, required: true, ref: 'Season' },
    round : { type: Schema.Types.ObjectId, required: true, ref: 'Round' },
    date: String,
    time: String,
    weather: String,
    laps: Number,
    sessionNumber: Number,
    sessionType: String,
    pointsTable: { type: Schema.Types.ObjectId, required: true, ref: 'Points' },
    results: [{ type: Schema.Types.ObjectId, ref: 'Result' }]
  }
);

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;

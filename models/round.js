const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoundSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, required: true, ref: 'Series' },
    season: { type: Schema.Types.ObjectId, required: true },
    track: { type: Schema.Types.ObjectId, required: true, ref: 'Track' },
    round: Number,
    roundType: String,
    configuration: String,
    sessions: [{
      date: String,
      time: String,
      weather: String,
      laps: Number,
      sessionType: String,
      pointsTable: { type: Schema.Types.ObjectId, required: true, ref: 'Points' },
      results: [{ type: Schema.Types.ObjectId, ref: 'Result' }]
    }]    
  }
);

const Round = mongoose.model("Round", RoundSchema);

module.exports = Round;


/* TODO:
 * Add round modal should have all round info in first tab
 * Then have a tab for each race with remaining info
 * Have a + button tab, and a delete button inside the race tab
 * NOTE: populate can be limited to certain fields
*/

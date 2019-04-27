const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeasonSchema = new Schema({  
  season: { type: Number, default: 1 },
  series: { type: Schema.Types.ObjectId, ref: 'Series' },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  races: [{ type: Schema.Types.ObjectId, ref: 'Race' }],
})

const Season = mongoose.model("Season", SeasonSchema);

module.exports = Season;

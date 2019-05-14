const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Scheme
const TeamSchema = new Schema({
  name: { type: String, required: true },
  driver_a: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  driver_b: { type: Schema.Types.ObjectId, ref: 'User' },
  season: { type: Schema.Types.ObjectId, ref: 'Season' },
  registered: { type: Date, default: Date.now }
});

TeamSchema.index({name: 1, season: 1}, {unique: true});

// Create model
const Team = mongoose.model("Team", TeamSchema);

// Export to use in other files
module.exports = Team;

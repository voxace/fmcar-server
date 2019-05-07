const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Scheme
const TeamSchema = new Schema({
  name: { type: String, unique: true, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  seasons: [{ type: Schema.Types.ObjectId, ref: 'Season' }],
  registered: { type: Date, default: Date.now }
});

// Create model
const Team = mongoose.model("Team", TeamSchema);

// Export to use in other files
module.exports = Team;

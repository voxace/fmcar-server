const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Scheme
const TeamSchema = new Schema({
  name: String,
  users: [Schema.Types.ObjectId]
});

// Create model
const Team = mongoose.model("Team", TeamSchema);

// Export to use in other files
module.exports = Team;

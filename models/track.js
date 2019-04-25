const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    logo: String
  }
);

const Track = mongoose.model("Track", TrackSchema);

module.exports = Track;

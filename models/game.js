const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AverageSchema = new Schema(
  {
    _id: {
      studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
      periodId: { type: mongoose.Schema.Types.ObjectId, required: true }
    },
    average: { type: Number, default: 0 },
    studentGrade: Number
  }
);

AverageSchema.index(
  { "_id.studentId": 1, "_id.periodId": 1 },
  { name: "unique_average", unique: true }
);

// Create New Average
AverageSchema.statics.NewAverage = function(
  _id,
  average,
  studentGrade,
  callback
) {
  return this.findOneAndUpdate(
    {
      _id: _id
    },
    {
      $set: {
        average: average,
        studentGrade: studentGrade
      }
    },
    { 
      upsert: true, 
      new: true 
    },
    callback
  );
};

const Average = mongoose.model("Average", AverageSchema);

module.exports = Average;

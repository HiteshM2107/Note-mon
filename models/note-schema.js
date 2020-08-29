const mongoose = require("mongoose");
var schema = mongoose.Schema;

var notesSchema = new schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 32,
      trim: true,
    },
    body: {
      type: String,
      trim: true,
      maxLength: 32,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Notes", notesSchema);

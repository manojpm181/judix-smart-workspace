const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
  type: String,
  enum: ["todo", "progress", "done"],
  default: "todo"
}
,
  priority: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Task", taskSchema);

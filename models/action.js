const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionSchema = new Schema({
  title: String,
  experience: { type: Number, default: 20 },
  description: String,
  icon: String,
  isCompleted: { type: Boolean, default: false },
  allTasksCompleted: { type: Boolean, default: false },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  dino: {
    name: String,
    img: String,
    isCompleted: { type: Boolean, default: false }
  },
  ref: Number,
});

const Action = mongoose.model("Action", actionSchema);

module.exports = Action;

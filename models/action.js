const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionSchema = new Schema({
  title: String,
  experience: { type: Number, default: 20 },
  description: String,
  icon: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  dino: {
    name: String,
    img: String,
  },
  ref: Number,
});

const Action = mongoose.model("Action", actionSchema);

module.exports = Action;

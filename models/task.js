const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String , required: true },
    isCompleted: {type : Boolean, default: false},
    experience: { type: Number, required: true },
    isPublic: { type: Boolean, required: true},
    // actions:  {type: Schema.Types.ObjectId, ref: "Action"},
    ref : Number,
    owner: {type: Schema.Types.ObjectId, ref: "User", default: "5fd33239e1260618f701ecf4"},
  }
);


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

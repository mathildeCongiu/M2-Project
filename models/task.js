const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String , required: true },
    isCompleted: {type : Boolean, default: false},
    experience: { type: Number, required: true },
    isPublic: { type: Boolean, required: true},
    // actions: [mongoose.Types.ObjectID]
  }
);


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

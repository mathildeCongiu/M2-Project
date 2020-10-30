const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionSchema = new Schema(
  {
    title: String ,
    isCompleted: {type : Boolean, default: false},
    experience: { type: Number, default: 20 },
    description: String,
    // tasks: [mongoose.Types.ObjectID],
    dino: {
        name: String,
        img: String,
        }
  }
);


const Action = mongoose.model("Action", actionSchema);

module.exports = Action;

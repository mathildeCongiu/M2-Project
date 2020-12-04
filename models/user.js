const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Action = require("../models/action");
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: {
      type: [ Object ],
      default: [
        {
          name: "Planetkiller",
          img: "/images/planetkiller.png",
        },
        {
          name: "Survivor",
          img: "/images/survivor.png",
        },
        {
          name: "Explorator",
          img: "/images/explorador.png",
        },
        {
          name: "Eco-Warrior",
          img: "/images/eco-warrior.png",
        },
        {
          name: "Planet Saviour",
          img: "/images/planetsaviour.png",
        },
      ]
    },

    experience: { type: Number, default: 0 },
    actionsPending: [{ type: Schema.Types.ObjectId, ref: "Action" }],
    actionsCompleted: [{ type: Schema.Types.ObjectId, ref: "Action" }],
    actionsActiveButton: [{ type: Schema.Types.ObjectId, ref: "Action" }],
    tasksPending: [ {type: Schema.Types.ObjectId, ref: "Task"}],
    tasksCompleted: [ {type: Schema.Types.ObjectId, ref: "Task"}],
    dinosaved: [{ type: Object }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

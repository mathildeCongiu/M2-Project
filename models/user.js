const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: {
      name: {
        type: String,
        default: "Planetkiller",
      },
      rank: { type: Number, enum: [1, 2, 3, 4, 5], default: 1 },
      img: {
        type: String,
        default: "/images/planetkiller.png",
      },
    },

    experience: { type: Number, default: 0 },
    // actions: [{type: Schema.Types.ObjectId, ref: "Action", default: }],
    // tasks: [ {type: Schema.Types.ObjectId, ref: "Task"}],
  },
  { 
      timestamps: {
           createdAt: "created_at", 
           updatedAt: "updated_at" 
        } }
);


const User = mongoose.model("User", userSchema);

module.exports = User;

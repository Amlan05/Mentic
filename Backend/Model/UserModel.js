const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number },
  location: { type: String },
  status: { type: String },
  education: { type: String },
  goals: { type: String },
  background: { type: String },
});

exports.userModel = mongoose.model("User", UserSchema)

//users

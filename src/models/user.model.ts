import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

// userSchema.pre("save")

const User = mongoose.model("User", userSchema);

export default User;

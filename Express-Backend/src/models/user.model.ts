import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: Number, default: 1 },
  join: { type: Date, default: Date.now },
  userType: { type: Number, default: 0 },
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;

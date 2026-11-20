import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    default: "/defaultUserImage/defaultImage.png"
  },
  public_id: {
    type: String,

  },
  description: {
    type: String,
    default: "Hi , I Am Here"
  },
 resetPasswordToken: {
    type: String,
    default: null
},

resetPasswordExpire: {
    type: Date,
    default: null
},
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
  },


});

const User = mongoose.model("User", userSchema);

export default User;
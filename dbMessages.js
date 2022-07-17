import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  number: Number,
  message: String,
  name: String,
  timestamp: String,
});

export default mongoose.model("messagecontents", messageSchema);

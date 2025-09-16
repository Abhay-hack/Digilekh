import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ reference User
  text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);

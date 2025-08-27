import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, maxlength: 500 },
    dueDate: { type: Date },
    category: { type: String, enum: ["Urgent", "Non-Urgent"], default: "Non-Urgent" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);

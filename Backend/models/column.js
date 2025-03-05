import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
});

export default mongoose.model("Column", ColumnSchema);

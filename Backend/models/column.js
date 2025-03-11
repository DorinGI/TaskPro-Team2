import mongoose from 'mongoose';

const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  order: {
    type: Number,
    default: function () {
      return this.constructor
        .countDocuments({ boardId: this.boardId })
        .exec()
        .then(count => count);
    },
  },
});
ColumnSchema.index({ boardId: 1, title: 1 }, { unique: true });

export default mongoose.model('Column', ColumnSchema);

import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, default: 'icon1' },
  background: { type: String, default: 'none' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Board', BoardSchema);

import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, default: 'icon1' },
  background: { type: String, default: 'none' },
});

export default mongoose.model('Board', BoardSchema);

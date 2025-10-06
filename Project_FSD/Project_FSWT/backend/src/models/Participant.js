import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['registered', 'checked_in', 'cancelled'], default: 'registered' },
    // Registration details captured from the form
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    tickets: { type: Number, default: 1 }
  },
  { timestamps: true }
);

participantSchema.index({ event: 1, user: 1 }, { unique: true });

export default mongoose.model('Participant', participantSchema);



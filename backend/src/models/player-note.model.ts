import mongoose, { Schema, Document } from 'mongoose';
import { IPlayerNote } from '../interfaces/player-note.interface';

export interface IPlayerNoteDocument extends Omit<IPlayerNote, 'id'>, Document {}

const PlayerNoteSchema: Schema = new Schema({
  playerId: { type: String, required: true },
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['INJURY', 'RED_CARD', 'DISQUALIFICATION', 'PERSONAL'],
    required: true 
  },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { 
    type: Boolean, 
    default: function() {
      const now = new Date();
      return this.startDate <= now && now <= this.endDate;
    }
  }
}, {
  timestamps: true
});

PlayerNoteSchema.virtual('id').get(function() {
  return this._id ? Number(this._id.toString().slice(-8), 16) : null;
});

PlayerNoteSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model<IPlayerNoteDocument>('PlayerNote', PlayerNoteSchema); 
import { Schema, model } from 'mongoose';
import { IFantasyFormation } from '../../interfaces/formations.interface';

const fantasyFormationSchema = new Schema<IFantasyFormation>({
  name: { type: String, required: true },
  isArchived: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default model<IFantasyFormation>('FantasyFormation', fantasyFormationSchema); 
import { Schema, model } from 'mongoose';
import { IMantraFormation } from '../../interfaces/formations.interface';

const mantraFormationSchema = new Schema<IMantraFormation>({
  name: { type: String, required: true },
  isArchived: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default model<IMantraFormation>('MantraFormation', mantraFormationSchema); 
import { Schema, model } from 'mongoose';
import { IRealFormation } from '../../interfaces/formations.interface';

const realFormationSchema = new Schema<IRealFormation>({
  name: { type: String, required: true },
  isArchived: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default model<IRealFormation>('RealFormation', realFormationSchema); 
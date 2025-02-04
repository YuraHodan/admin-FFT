import mongoose, { Schema, Document } from 'mongoose';
import { ITeam } from '../interfaces/team.interface';

export interface ITeamDocument extends Omit<ITeam, 'id'>, Document {}

const PlayerListSchema: Schema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String }
}, {
  _id: false
});

const TeamSchema: Schema = new Schema({
  logo: { type: String, required: true },
  name: { type: String, required: true },
  isArchived: { type: Boolean, default: false },
  players: [PlayerListSchema]
}, {
  timestamps: true
});

TeamSchema.virtual('playersCount').get(function() {
  return this.players?.length || 0;
});

TeamSchema.virtual('id').get(function() {
  return this._id ? this._id.toString() : null;
});

TeamSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model<ITeam & Document>('Team', TeamSchema); 
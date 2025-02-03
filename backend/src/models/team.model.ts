import mongoose, { Schema, Document } from 'mongoose';
import { ITeam } from '../interfaces/team.interface';

export interface ITeamDocument extends Omit<ITeam, 'id'>, Document {}

const PlayerListSchema: Schema = new Schema({
  id: { type: Number, required: true },
  firstName: { type: String },
  lastName: { type: String }
}, {
  _id: false
});

const TeamSchema: Schema = new Schema({
  logo: { type: String, required: true },
  name: { type: String, required: true },
  playersCount: { type: Number },
  isArchived: { type: Boolean, default: false },
  players: [PlayerListSchema]
}, {
  timestamps: true
});

TeamSchema.pre('save', function(next) {
  if (this.players) {
    this.playersCount = this.players.length;
  }
  next();
});

TeamSchema.pre('findOneAndUpdate', function(next) {
  const update: any = this.getUpdate();
  if (update && update.players) {
    update.playersCount = update.players.length;
  }
  next();
});

TeamSchema.virtual('id').get(function() {
  return this._id ? Number(this._id.toString().slice(-8), 16) : null;
});

TeamSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model<ITeamDocument>('Team', TeamSchema); 
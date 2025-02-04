import mongoose, { Schema, Document } from 'mongoose';
import { IPlayer } from '../interfaces/player.interface';
import { PlayerFantasyPosition, PlayerMantraPosition } from '../interfaces/player-positions.enum';

export interface IPlayerDocument extends Omit<IPlayer, 'id'>, Document {}

const TeamShortSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  logo: { type: String, required: true }
}, {
  _id: false
});

const PlayerSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: false },
  birthDate: { type: Date, required: true },
  country: { type: String, required: false },
  fantasyPosition: { 
    type: String, 
    enum: Object.values(PlayerFantasyPosition),
    required: true 
  },
  mantraPosition: { 
    type: String, 
    enum: Object.values(PlayerMantraPosition),
    required: true 
  },
  isArchived: { type: Boolean, default: false },
  team: { type: TeamShortSchema, required: false }
}, {
  timestamps: true
});

PlayerSchema.virtual('id').get(function() {
  return this._id ? Number(this._id.toString().slice(-8), 16) : null;
});

PlayerSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model<IPlayerDocument>('Player', PlayerSchema); 
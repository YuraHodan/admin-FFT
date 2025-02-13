import { Schema, model } from 'mongoose';

export interface ISeason {
  id?: string;
  name: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const seasonSchema = new Schema<ISeason>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      }
    }
  }
);

export const Season = model<ISeason>('Season', seasonSchema); 
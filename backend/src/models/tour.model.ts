import { Schema, model, Types } from 'mongoose';

interface ITeam {
  teamId: Types.ObjectId;
  type: 'HOME' | 'AWAY';
}

export interface ITour {
  id?: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: string;
  seasonId: Types.ObjectId;  // Додаємо поле для зв'язку з сезоном
  matches: Array<{
    date: Date;
    status: string;
    homeTeam: ITeam;
    awayTeam: ITeam;
    homeGoals?: number;
    awayGoals?: number;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum TourStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',  // Додаємо новий статус
  POSTPONED = 'POSTPONED',
  COMPLETED = 'COMPLETED'
}

const teamSchema = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Team'
  },
  type: {
    type: String,
    enum: ['HOME', 'AWAY'],
    required: true
  }
});

const tourSchema = new Schema<ITour>(
  {
    number: {
      type: Number,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    seasonId: {  // Додаємо поле в схему
      type: Schema.Types.ObjectId,
      ref: 'Season',
      required: true
    },
    matches: [{
      date: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        required: true,
        default: 'SCHEDULED'  // Додаємо дефолтне значення
      },
      homeTeam: {
        type: teamSchema,
        required: true
      },
      awayTeam: {
        type: teamSchema,
        required: true
      },
      homeGoals: Number,
      awayGoals: Number
    }]
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

export const Tour = model<ITour>('Tour', tourSchema); 
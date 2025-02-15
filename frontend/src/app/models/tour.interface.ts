import { Match } from './match.interface';

export enum TourStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  POSTPONED = 'POSTPONED',
  COMPLETED = 'COMPLETED'
}

export interface Tour {
  id?: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: TourStatus;
  seasonId: string;
  matches: Match[];
  createdAt?: Date;
  updatedAt?: Date;
} 
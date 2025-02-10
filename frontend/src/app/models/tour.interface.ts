import { Match } from './match.interface';

export interface Tour {
  id?: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: TourStatus;
  matches: Match[];
}

export enum TourStatus {
  ACTIVE = 'ACTIVE',
  POSTPONED = 'POSTPONED',
  COMPLETED = 'COMPLETED'
} 
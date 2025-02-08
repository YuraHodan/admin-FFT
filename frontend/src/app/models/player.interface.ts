import { PlayerFantasyPosition, PlayerMantraPosition } from './player-positions.enum';
import { TeamShort } from './team-short.interface';

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  birthDate: Date;
  country: string;
  fantasyPosition: PlayerFantasyPosition;
  mantraPosition: PlayerMantraPosition;
  isArchived?: boolean;
  team?: TeamShort | null;
  instagramUrl?: string;
  transfermarktUrl?: string;
} 
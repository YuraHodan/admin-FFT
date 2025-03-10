import { PlayerFantasyPosition, PlayerMantraPosition } from './player-positions.enum';
import { ITeamShort } from './team-short.interface';
import { IPlayerNote } from './player-note.interface';

export interface IPlayer {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  birthDate: Date;
  country: string;
  fantasyPosition: PlayerFantasyPosition;
  mantraPosition: PlayerMantraPosition;
  isArchived?: boolean;
  team?: ITeamShort | null;
  instagramUrl?: string;
  transfermarktUrl?: string;
  notes?: IPlayerNote[];
  isAvailable?: boolean;
  activeNotes?: IPlayerNote[];
} 
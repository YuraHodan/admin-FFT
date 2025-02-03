import { PlayerFantasyPosition, PlayerMantraPosition } from './player-positions.enum';
import { ITeamShort } from './team-short.interface';

export interface IPlayer {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  birthDate: Date;
  country: string;
  fantasyPosition: PlayerFantasyPosition;
  mantraPosition: PlayerMantraPosition;
  isArchived?: boolean;
  team?: ITeamShort;
} 
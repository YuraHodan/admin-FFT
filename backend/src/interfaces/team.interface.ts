import { IPlayerList } from './player-list.interface';

export interface ITeam {
  id: number;
  logo: string;
  name: string;
  playersCount: number;
  isArchived?: boolean;
  players: IPlayerList[];
} 
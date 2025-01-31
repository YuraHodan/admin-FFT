import { PlayerList } from './player-list.interface';

export interface Team {
  id: number;
  logo: string;
  name: string;
  playersCount: number;
  isArchived?: boolean;
  players: PlayerList[];
} 
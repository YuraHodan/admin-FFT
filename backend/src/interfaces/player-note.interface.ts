export enum PlayerNoteType {
  INJURY = 'INJURY',
  RED_CARD = 'RED_CARD',
  DISQUALIFICATION = 'DISQUALIFICATION',
  PERSONAL = 'PERSONAL'
}

export interface IPlayerNote {
  id: string;
  playerId: string;
  type: PlayerNoteType;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
} 
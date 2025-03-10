export enum PlayerNoteType {
  INJURY = 'INJURY',
  RED_CARD = 'RED_CARD',
  DISQUALIFICATION = 'DISQUALIFICATION',
  PERSONAL = 'PERSONAL'
}

export interface PlayerNote {
  id: string;
  playerId: string;
  title: string;
  description: string;
  type: PlayerNoteType;
  startDate: Date;
  endDate: Date;
  isActive?: boolean;
  createdAt: Date;
  updatedAt?: Date;
} 
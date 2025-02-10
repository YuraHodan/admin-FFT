export interface Match {
  id?: string;
  startDate: Date;
  status: MatchStatus;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
}

export interface MatchTeam {
  teamId: string;
  type: TeamType;
  goals?: number;
}

export enum MatchStatus {
  NORMAL = 'NORMAL',
  POSTPONED = 'POSTPONED'
}

export enum TeamType {
  HOME = 'HOME',
  AWAY = 'AWAY'
} 
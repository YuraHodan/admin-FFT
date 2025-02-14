export enum MatchStatus {
  NORMAL = 'NORMAL',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  POSTPONED = 'POSTPONED',
  CANCELLED = 'CANCELLED'
}

export interface Match {
  date: Date;
  status: MatchStatus;
  homeTeam: string;
  awayTeam: string;
  homeGoals?: number;
  awayGoals?: number;
}

export interface MatchTeam {
  teamId: string;
  type: TeamType;
  goals?: number;
}

export enum TeamType {
  HOME = 'HOME',
  AWAY = 'AWAY'
} 
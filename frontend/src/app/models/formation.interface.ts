export interface Position {
  id: string;
  name: string;
  shortName: string;
}

export interface Formation {
  id: string;
  name: string;
  positions: Position[];
} 
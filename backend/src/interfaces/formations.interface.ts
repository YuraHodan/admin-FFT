interface IBaseFormation {
  id: number;
  name: string;
  isArchived?: boolean;
}

export interface IFantasyFormation extends IBaseFormation {}
export interface IMantraFormation extends IBaseFormation {}
export interface IRealFormation extends IBaseFormation {} 
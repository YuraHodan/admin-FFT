export interface Season {
  id?: string;
  name: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateSeasonDto {
  name: string;
  isActive: boolean;
}

export interface UpdateSeasonDto {
  name?: string;
  isActive?: boolean;
} 
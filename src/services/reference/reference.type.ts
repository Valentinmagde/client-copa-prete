export interface Province {
  id: number;
  name: string;
  region: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Commune {
  id: number;
  name: string;
  provinceId: number;
 isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Sector {
  id: number;
  nameFr: string;
  nameRn: string;
  descriptionFR: string;
  descriptionRn: string;
  isCopaEligible: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
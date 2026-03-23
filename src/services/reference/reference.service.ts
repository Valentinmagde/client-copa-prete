import HttpService from '../httpService';
import type { Commune, Province, Sector } from './reference.type';

const httpService = new HttpService();

const ReferenceService = {
  getAllPovinces: async (lang: string = 'rn') => {
    return httpService.service().get<Province[]>(`reference/provinces?lang=${lang}`);
  },

  getCommunesByProvince: async (provinceId: any, lang: string = 'rn') => {
    return httpService.service().get<Commune[]>(`reference/provinces/${provinceId}/communes?lang=${lang}`);
  },

  getBusinessSectors: async (eligible: boolean, lang: string = 'rn') => {
    return httpService.service().get<Sector[]>(`reference/business-sectors?lang=${lang}&eligible=${eligible}`);
  },

  getCurrentCopaPhases: async (lang: string = 'rn') => {
    return httpService.service().get<Sector[]>(`reference/copa-phases/current?lang=${lang}`);
  },
};

export default ReferenceService;

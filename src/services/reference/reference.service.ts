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

  getShowingCurrency: async ({lang = 'en'}) => {
    return httpService.service().get(`${lang}/currencies/showing`);
  },

  getCurrencyById: async (id, lang = 'en') => {
    return httpService.service().get(`${lang}/currency/${id}`);
  },

  addCurrency: async (body, lang = 'en') => {
    return httpService.service().post(`${lang}/currencies`, body);
  },

  addAllCurrency: async (body, lang = 'en') => {
    return httpService.service().post(`${lang}/currencies/many`, body);
  },

  updateCurrency: async (id, body, lang = 'en') => {
    return httpService.service().put(`${lang}/currency/${id}`, body);
  },

  updateManyCurrencies: async (body, lang = 'en') => {
    return await httpService.service().put(`${lang}/currencies/many`, body);
  },

  updateEnabledStatus: async (id, body, lang = 'en') => {
    return await httpService.service().put(`${lang}/currency/${id}/status`, body);
  },

  updateLiveExchangeRateStatus: async (id, body, lang = 'en') => {
    return await httpService.service().put(`${lang}/currency/${id}/live-exchange-rates`, body);
  },

  deleteCurrency: async (id, lang = 'en') => {
    return await httpService.service().delete(`${lang}/currency/${id}`);
  },

  deleteManyCurrency: async (body, lang = 'en') => {
    const ids = body.join(",");
    return await httpService.service().delete(`${lang}/currencies/${ids}`);
  },
};

export default ReferenceService;

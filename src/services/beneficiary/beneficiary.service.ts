import HttpService from '../httpService';

const httpService = new HttpService();

const BeneficiaryService = {
  getByUserId: async (id: number, lang: string = 'rn') => {
    return httpService.service().get<any[]>(`beneficiaries/user/${id}?lang=${lang}`);
  },

  update: async (id: number, data: any, lang: string = "rn") => {
    return httpService.service().put(`beneficiaries/${id}?lang=${lang}`, data);
  },
};

export default BeneficiaryService;

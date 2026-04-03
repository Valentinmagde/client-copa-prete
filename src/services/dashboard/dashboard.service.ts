import HttpService from '../httpService';

const httpService = new HttpService();

const DashboardService = {
    getStatsCards: async (lang: string = 'rn') => {
        return httpService.service().get<any[]>(`dashboard/stats?lang=${lang}`);
    },
};

export default DashboardService;

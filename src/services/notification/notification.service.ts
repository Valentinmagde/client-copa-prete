import HttpService from "../httpService";
import { getLocale } from "@/utils/storage";

const httpService = new HttpService();
const baseUrl = "/notifications";

const NotificationService = {
    /**
     * Send contact message
     */
    async sendContactMessage (formData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    }) {
        return httpService.service().post(`${baseUrl}/contact`, formData)
    }
}

// Export d'une instance unique
export default NotificationService;

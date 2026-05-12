import HttpService from '../httpService';

export type ComplaintPayload = {
  anonymous: boolean;
  name?: string;
  contact?: string;
  type: 'tech' | 'selection' | 'behavior' | 'corruption' | 'vbg' | 'other';
  date?: string;
  location?: string;
  description: string;
};

export type ComplaintSubmissionResponse = {
  id: number;
  referenceNumber: string;
};

const httpService = new HttpService();

const ComplaintService = {
  submitComplaint: async (
    payload: ComplaintPayload,
    files: File[] = [],
  ): Promise<ComplaintSubmissionResponse> => {
    if (files.length === 0) {
      return httpService
        .service()
        .post<ComplaintSubmissionResponse, ComplaintPayload>('complaints', payload);
    }

    const formData = new FormData();
    formData.append('anonymous', String(payload.anonymous));
    if (payload.name)        formData.append('name',     payload.name);
    if (payload.contact)     formData.append('contact',  payload.contact);
    formData.append('type',        payload.type);
    formData.append('description', payload.description);
    if (payload.date)        formData.append('date',     payload.date);
    if (payload.location)    formData.append('location', payload.location);
    files.forEach((file) => formData.append('files', file));

    return httpService
      .service()
      .post<ComplaintSubmissionResponse, FormData>('complaints', formData, undefined, true);
  },
};

export default ComplaintService;

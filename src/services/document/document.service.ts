import HttpService from "../httpService";
import { getLocale } from "@/utils/storage";

const httpService = new HttpService();
const baseUrl = "/documents";

export interface UploadFormDocumentDto {
  entityId: number;
  entityType?: string;
  documentKey: string;
  documentTypeId: number;
  formStep?: string;
}

export interface Document {
  id: number;
  uuid: string;
  documentTypeId: number;
  documentKey: string;
  formStep: string;
  entityId: number;
  entityType: string;
  originalFilename: string;
  storedFilename: string;
  filePath: string;
  fileSizeBytes: number;
  mimeType: string;
  hashSha256: string;
  uploadedAt: string;
  uploadedByUserId: number;
  uploadedIp: string;
  validationStatus: "PENDING" | "VALIDATED" | "REJECTED";
  validatedAt: string | null;
  validatedByUserId: number | null;
  rejectionComment: string | null;
  createdAt: string;
  updatedAt: string;
  documentType?: {
    id: number;
    name: string;
    description: string;
    allowedFormats: string[];
    maxSizeMb: number;
  };
  uploadedBy?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface DocumentStatus {
  documentKey: string;
  isUploaded: boolean;
  document: Document | null;
  validationStatus: string | null;
}

const DocumentService = {
  /**
   * Upload d'un document depuis le formulaire
   */
  async uploadFormDocument(
    file: File,
    data: UploadFormDocumentDto,
  ): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("entityId", data.entityId.toString());
    formData.append("entityType", data.entityType || "beneficiary");
    formData.append("documentKey", data.documentKey);
    formData.append("documentTypeId", data.documentTypeId.toString());
    if (data.formStep) {
      formData.append("formStep", data.formStep);
    }

    console.log("file in FormData:", formData.get("file"));

    const response = await httpService
      .service()
      .post(`${baseUrl}/upload`, formData, undefined, true);
    return response;
  },

  /**
   * Récupérer tous les documents d'une entité
   */
  async getEntityDocuments(
    entityId: number,
    entityType?: string,
    documentKey?: string,
  ): Promise<any> {
    const params: any = {};
    if (entityType) params.entityType = entityType;
    if (documentKey) params.documentKey = documentKey;

    const response = await httpService
      .service()
      .get(`${baseUrl}/entity/${entityId}`, {
        params,
        headers: { "Accept-Language": getLocale() },
      });
    return response;
  },

  /**
   * Récupérer les documents d'un bénéficiaire
   */
  async getBeneficiaryDocuments(
    beneficiaryId: number,
  ): Promise<{ success: boolean; data: Document[] }> {
    return this.getEntityDocuments(beneficiaryId, "beneficiary");
  },

  /**
   * Récupérer le statut des documents requis pour un bénéficiaire
   */
  async getDocumentStatus(
    beneficiaryId: number,
    companyStatus: "formal" | "informal" | "project",
  ): Promise<any> {
    const response = await httpService
      .service()
      .get(`${baseUrl}/beneficiary/${beneficiaryId}/status`, {
        params: { companyStatus },
        headers: { "Accept-Language": getLocale() },
      });
    return response;
  },

  /**
   * Télécharger un document
   */
  async downloadDocument(id: number): Promise<Blob> {
    const response: any = await httpService
      .service()
      .get(`${baseUrl}/${id}/download`, {
        responseType: "blob",
        headers: { "Accept-Language": getLocale() },
      });
    return response;
  },

  /**
   * Supprimer un document
   */
  async deleteDocument(id: number): Promise<any> {
    const response = await httpService
      .service()
      .delete(`${this.baseUrl}/${id}`, {
        headers: { "Accept-Language": getLocale() },
      });
    return response;
  },

  /**
   * Obtenir un document par son ID
   */
  async getDocumentById(id: number): Promise<any> {
    const response = await httpService.service().get(`${baseUrl}/${id}`, {
      headers: { "Accept-Language": getLocale() },
    });
    return response;
  },

  /**
   * Valider un document (admin)
   */
  async validateDocument(id: number, comment?: string): Promise<any> {
    const response = await httpService
      .service()
      .post(
        `${this.baseUrl}/${id}/validate`,
        { comment },
        { headers: { "Accept-Language": getLocale() } },
      );
    return response;
  },

  /**
   * Rejeter un document (admin)
   */
  async rejectDocument(id: number, comment: string): Promise<any> {
    const response = await httpService
      .service()
      .post(
        `${this.baseUrl}/${id}/reject`,
        { comment },
        { headers: { "Accept-Language": getLocale() } },
      );
    return response;
  },

  /**
   * Obtenir tous les types de documents disponibles
   */
  async getDocumentTypes(requiredFor?: string): Promise<any> {
    const params: any = {};
    if (requiredFor) params.requiredFor = requiredFor;

    const response = await httpService.service().get(`${this.baseUrl}/types`, {
      params,
      headers: { "Accept-Language": getLocale() },
    });
    return response;
  },

  /**
   * Vérifier si tous les documents requis sont uploadés
   */
  async areRequiredDocumentsUploaded(
    beneficiaryId: number,
    companyStatus: "formal" | "informal" | "project",
  ): Promise<boolean> {
    try {
      const response = await this.getDocumentStatus(
        beneficiaryId,
        companyStatus,
      );
      const requiredDocs = response.data.filter((status) => {
        // Pour 'formal' et 'informal', tous sont requis sauf managerAct
        if (companyStatus === "formal") {
          return status.documentKey !== "managerAct" ? status.isUploaded : true;
        }
        return status.isUploaded;
      });
      return requiredDocs.every((status) => status.isUploaded);
    } catch (error) {
      console.error("Error checking required documents:", error);
      return false;
    }
  },
};

// Export d'une instance unique
export default DocumentService;

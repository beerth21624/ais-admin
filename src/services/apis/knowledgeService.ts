import axiosInstance from "../configAxios";

interface Knowledge {
  // Define the structure of a Knowledge object
  id?: string;
  title?: string;
  description?: string;
  // Add other relevant fields
}

interface QAItem {
  question: string;
  answer: string;
  record_status?: string;
}

interface ImageItem {
  description: string;
  record_status?: string;
}

interface LinkItem {
  name: string;
  url: string;
  is_recommend: boolean;
}

class KnowledgeService {
  static PATH = "/knowledge";

  static async getKnowledge() {
    return axiosInstance.get<Knowledge[]>(this.PATH);
  }

  static async getKnowledgeById(id: string) {
    return axiosInstance.get<Knowledge>(`${this.PATH}/${id}`);
  }

  static async createKnowledge(knowledge: Knowledge) {
    return axiosInstance.post<Knowledge>(this.PATH, knowledge);
  }

  static async updateKnowledge(knowledge: Knowledge) {
    return axiosInstance.put<Knowledge>(this.PATH, knowledge);
  }

  static async deleteKnowledge(id: string) {
    return axiosInstance.delete(`${this.PATH}/${id}`);
  }

  static async createKnowledgeQA(folderId: string, item: QAItem) {
    return axiosInstance.post(`${this.PATH}/qa/${folderId}`, item);
  }

  static async createKnowledgeImage(folderId: string, item: any) {
    return axiosInstance.post(`${this.PATH}/image/${folderId}`, item);
  }

  static async updateKnowledgeQA(
    folderId: string,
    qa_id: string,
    item: Partial<QAItem>
  ) {
    return axiosInstance.patch(`${this.PATH}/qa/${folderId}/${qa_id}`, item);
  }

  static async updateKnowledgeImage(
    folderId: string,
    image_id: string,
    item: Partial<ImageItem>
  ) {
    return axiosInstance.patch(
      `${this.PATH}/image/${folderId}/${image_id}`,
      item
    );
  }

  static async deleteKnowledgeQA(folderId: string, qa_id: string) {
    return axiosInstance.delete(`${this.PATH}/qa/${folderId}/${qa_id}`);
  }

  static async deleteKnowledgeImage(folderId: string, image_id: string) {
    return axiosInstance.delete(`${this.PATH}/image/${folderId}/${image_id}`);
  }

  static async getLinkKnowledge(folderId: string) {
    return axiosInstance.get(`${this.PATH}/link/${folderId}`);
  }

  static async getLinkKnowledgeById(folderId: string, link_id: string) {
    return axiosInstance.get(`${this.PATH}/link/${folderId}/${link_id}`);
  }

  static async createLinkKnowledge(folderId: string, item: LinkItem) {
    return axiosInstance.post(`${this.PATH}/link/${folderId}`, item);
  }

  static async deleteLinkKnowledge(folderId: string, link_id: string) {
    return axiosInstance.delete(`${this.PATH}/link/${folderId}/${link_id}`);
  }

  static async multipleDeleteKnowledge(
    folderId: string,
    item: { link_ids: string[] }
  ) {
    return axiosInstance.post(
      `${this.PATH}/list/${folderId}/multi-delete`,
      item
    );
  }

  static async trainingLinkKnowledge(folderId: string, link_id: string) {
    return axiosInstance.post(
      `${this.PATH}/link/${folderId}/${link_id}/training`
    );
  }

  static async multipleTrainingLinkKnowledge(
    folderId: string,
    item: { link_ids: string[] }
  ) {
    return axiosInstance.post(
      `${this.PATH}/link/${folderId}/multi-training`,
      item
    );
  }
}

export default KnowledgeService;

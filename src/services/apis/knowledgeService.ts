import axiosInstance from '../configAxios';

class KnowledgeService {

  static PATH = '/knowledge';

    static async getKnowledge() {
        return axiosInstance.get(this.PATH);
    }

    static async getKnowledgeById(id:string) {
        return axiosInstance.get(`${this.PATH}/${id}`);
    }

    static async createKnowledge(knowledge:string) {
        return axiosInstance.post(this.PATH, knowledge);
    }

    static async updateKnowledge(knowledge:string) {
        return axiosInstance.put(this.PATH, knowledge);
    }

    static async deleteKnowledge(id:string) {
        return axiosInstance.delete(`${this.PATH}/${id}`);
    }

    static async createKnowledgeQA(folderId:string, item:any) {
        return axiosInstance.post(`${this.PATH}/qa/${folderId}`, item);
    }

    static async createKnowledgeImage(folderId:string, item:any) {
        return axiosInstance.post(`${this.PATH}/image/${folderId}`, item);
    }

    static async deleteKnowledgeQA(folderId:string, qa_id:string) {
        return axiosInstance.delete(`${this.PATH}/qa/${folderId}/${qa_id}`);
    }

    static async deleteKnowledgeImage(folderId:string, image_id:string) {
        return axiosInstance.delete(`${this.PATH}/image/${folderId}/${image_id}`);
    }


}

export default KnowledgeService;

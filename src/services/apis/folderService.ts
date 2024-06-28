import axiosInstance from "../configAxios";

class FolderService {
  static PATH = "/folder";

  static async getFolders() {
    return axiosInstance.get(this.PATH);
  }

  static async getFolderById(id:string) {
    return axiosInstance.get(`${this.PATH}/${id}`);
  }

  static async createFolder(folder:any) {
    return axiosInstance.post(this.PATH, folder);
  }

  static async updateFolder(id:string,folder:any) {
    return axiosInstance.patch(`${this.PATH}/${id}`, folder);
  } 

  static async deleteFolder(id:string) {
    return axiosInstance.delete(`${this.PATH}/${id}`);
  }
      static async updateGeneralKnowledge(id:string,knowledge:string) {
        return axiosInstance.patch(`${this.PATH}/general/${id}`, {
            general_knowledge: knowledge
        });
    }

}

export default FolderService;
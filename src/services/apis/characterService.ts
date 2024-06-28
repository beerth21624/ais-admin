import axiosInstance from "../configAxios";

type updateCharacterParams ={
    name:string,
    description:string,
    prompt:string,
    record_status:string,
}

class CharacterService {

    static PATH = '/character';
    
        static async getCharacters() {
            return axiosInstance.get(this.PATH);
        }
    
        static async getCharacterById(id:string) {
            return axiosInstance.get(`${this.PATH}/${id}`);
        }
    
        static async createCharacter(character:string) {
            return axiosInstance.post(this.PATH, character);
        }
    
        static async updateCharacter(id:string,
            character:updateCharacterParams) {
            return axiosInstance.patch(`${this.PATH}/${id}`, character);
        }
    
        static async deleteCharacter(id:string) {
            return axiosInstance.delete(`${this.PATH}/${id}`);
        }
            static async assignKnowledge(id:string, payload:any) {
        return axiosInstance.post(`${this.PATH}/assign/${id}`, payload);
    }
    
    }

export default CharacterService;
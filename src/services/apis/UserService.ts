import axiosInstance from '../configAxios';

class UserService {

  static PATH = '/user';

  static async login(user:any) {
        return axiosInstance.post(`${this.PATH}/login`, user);
    }

}

export default UserService;
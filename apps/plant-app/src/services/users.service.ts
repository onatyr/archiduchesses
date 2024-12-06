import { ApiService } from '../../../shared/services/api.service';
import { axiosInstance } from '../main';

export class UsersService extends ApiService {
  constructor() {
    super(axiosInstance, 'users');
  }

  async getUserName(userId: string): Promise<string> {
    return this._get(`/${userId}/name`)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.error(e);
        return [];
      });
  }
}

import { ApiService } from '../../../shared/services/api.service';
import { axiosInstance } from '@/main';

export class UserService extends ApiService {
  constructor() {
    super(axiosInstance, 'user');
  }

  getName(): Promise<string> {
    return this._get('/name')
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.error(e);
        return '';
      });
  }
}

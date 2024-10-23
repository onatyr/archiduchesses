import dotenv from 'dotenv';
import path from 'path';
import process from 'node:process';
import { axiosInstance } from '../../index';
import { ApiService } from '../../../shared/services/api.service';

dotenv.config({
  path: path.resolve(__dirname, '../../../../.env'),
});

// todo find better typing for return type
export class TrefleService extends ApiService {
  private apiToken = process.env.TREFLE_API_KEY;
  private params = {
    token: this.apiToken,
  };

  constructor() {
    super(axiosInstance, 'api/v1');
  }

  async searchPlant(query: string): Promise<string> {
    // Default error page when trying (not related to request)
    return this._get('/plants/search', {
      ...this.params,
      q: query,
    })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.error(e);
        return '';
      });
  }

  async getAllPlants(page: number): Promise<string> {
    return this._get(`/plants`, {
      ...this.params,
      page: page,
    })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.error(e);
        return '';
      });
  }

  async getAllSpecies(page: number): Promise<string> {
    return this._get('/species', {
      ...this.params,
      page: page,
    })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.error(e);
        return '';
      });
  }
}

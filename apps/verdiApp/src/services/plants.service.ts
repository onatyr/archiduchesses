import { ApiService } from '@shared/services';
import { Plant } from '@shared/models';
import { axiosInstance } from '@/main';

export class PlantsService extends ApiService {
  constructor() {
    super(axiosInstance, 'plant');
  }

  async getAll(): Promise<Plant[]> {
    return this._get('/all')
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.error(e);
        return [];
      });
  }

  async insertPlant(plant: FormData): Promise<boolean> {
    // todo maybe find a better way to type plant
    return this._post('/new', plant)
      .then(() => {
        return true;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  }
}

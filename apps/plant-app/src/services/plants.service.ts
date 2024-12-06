import { Plant } from '../../../shared/models';
import { ApiService } from '../../../shared/services/api.service';
import { axiosInstance } from '../main';

export class PlantsService extends ApiService {
  constructor() {
    super(axiosInstance, 'plants');
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

  async insertPlant(plant: Plant): Promise<boolean> {
    return this._post('/add', plant)
      .then(() => {
        return true;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  }

  async deletePlant(plantId: string): Promise<boolean> {
    return this._delete(`/delete/${plantId}`, null)
      .then(() => {
        return true;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  }
}

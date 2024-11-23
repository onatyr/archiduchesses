import { ApiService } from '../../../shared/services/api.service';
import dotenv from 'dotenv';
import path from 'path';
import { plantBookAxiosInstance } from '../../index';
import { PlantBookDetails, PlantBookEntity } from "../../../shared/models";

dotenv.config({
  path: path.resolve(__dirname, '../../../../.env'),
});

export class PlantBookService extends ApiService {
  private apiToken = process.env.PLANTBOOK_API_KEY;

  constructor() {
    super(plantBookAxiosInstance, 'https://open.plantbook.io/api/v1');
    plantBookAxiosInstance.defaults.headers.common['Authorization'] =
      `Token ${this.apiToken}`;
  }

    async searchPlantByName(search: string): Promise<PlantBookEntity[]> {
        return this._get(`/plant/search`, {
            alias: search,
            limit: 10,
            offset: 0,
        })
            .then((response) => {
                return response.data.results.map((plantEntity: { display_pid: string, pid: string}) => {
                    return {
                        name: plantEntity.display_pid,
                        pid: plantEntity.pid
                    }
                });
            })
            .catch((e) => {
                console.error(e);
                throw Error;
            });
    }

    async getPlantDetails(pid: string): Promise<PlantBookDetails | null> {
        return this._get(`/plant/detail/${pid}`)
            .then((response) => {
                return {
                    'pid': response.data.pid,
                    'display_pid': response.data.display_pid,
                    'max_light_lux': response.data.max_light_lux,
                    'min_light_lux': response.data.min_light_lux,
                    'max_soil_moist': response.data.max_soil_moist,
                    'min_soil_moist': response.data.min_soil_moist,
                    'image_url': response.data.image_url
                }
                ;
            })
            .catch((e) => {
                console.error(e);
                return null;
            });
    }
}

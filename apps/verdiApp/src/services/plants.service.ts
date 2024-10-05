import {ApiService} from "@/services/api.service";
import {Plant} from "../../../../dist/shared/models/plant.model";

export class PlantsService extends ApiService {
    constructor() {
        super("plant");
    }

    async getAll(): Promise<Plant[]> {
        return this._get("/all")
            .then(response => {
                return response.data
            })
            .catch(e => {
                console.log(e)
                return []
            })
    }
}

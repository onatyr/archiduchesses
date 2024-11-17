import {ApiService} from "../../../shared/services";
import {axiosInstance} from "../main";

export class PlacesService extends ApiService {
    constructor() {
        super(axiosInstance, 'place');
    }

    async getAll() {
        return this._get('/all') // todo typing
            .then((response) => {
                return response.data
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async getAllRoomsByPlaceId(placeId: string) {
        return this._get(`/allRoomsByPlaceId/${placeId}`) // todo typing
            .then((response) => {
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
}
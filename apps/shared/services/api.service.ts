// todo methods here should only be used by other services
import { AxiosInstance } from 'axios';

export class ApiService {
  private readonly baseUrl = '';
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance, baseRoute: string) {
    this.axiosInstance = axiosInstance;
    this.baseUrl += baseRoute || '';
  }

  async _get(route: string, queryParams: object | null = null) {
    return this.axiosInstance.get(this.baseUrl + route, {
      params: queryParams,
    });
  }

  async _post(route: string, data: any) {
    const headers: any = {};
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    return this.axiosInstance.post(this.baseUrl + route, data, { headers });
  }
}

import { User } from '@shared/models';
import { ApiService } from '@shared/services';
import { axiosInstance } from "@plantApp/src/main";

interface LoginResponse {
  success: boolean;
  user: User | null;
  token: string;
}

export default class AuthService extends ApiService {
  constructor() {
    super(axiosInstance, 'auth');
  }

  async register(
   email: string,
   password: string,
   name: string
  ): Promise<boolean> {
    try {
      const response = await this._post(
       '/register',
       {
         email: email,
         password: password,
         name: name,
       }
      );

      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this._post(
       '/login',
       {
         email: email,
         password: password,
       }
      );

      // Assuming the response contains the token and users data
      this.setToken(response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', response.data.userName);

      return {
        success: true,
        user: {
          id: response.data.userId,
          name: response.data.userName,
          email: response.data.email,
          password: response.data.password,
        },
        token: response.data.token,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        user: null,
        token: '',
      };
    }
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

import { ApiService } from '@shared/services';
import { axiosInstance } from '@/main';

export class AuthService extends ApiService {
  constructor() {
    super(axiosInstance, 'auth');
  }

  register(email: string, password: string, name: string): Promise<boolean> {
      return this._post(
          "/register",
          JSON.stringify({
              email: email,
              password: password,
              name: name,
          })
      ).then(response => {
          console.log(response.data)
          return true
      }
      ).catch(e => {
          console.log(e)
          return false
      })
  }

  login(email: string, password: string): Promise<boolean> {
    return this._post(
      '/login',
      JSON.stringify({
        email: email,
        password: password,
      })
    )
      .then((response) => {
        this.setToken(response.data.token);
        return true;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

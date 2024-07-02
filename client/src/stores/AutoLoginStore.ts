import { singleton } from 'tsyringe';

import { Store, Action } from 'usestore-ts';

import { apiService } from '../services/ApiService';

@singleton()
@Store()
class AutoLoginStore {
  isAutoLogin = localStorage.getItem('isAutoLogin') === 'true';

  @Action()
  setIaAutoLogin() {
    this.isAutoLogin = !this.isAutoLogin;
    localStorage.setItem('isAutoLogin', this.isAutoLogin.toString())
  }
}

export default AutoLoginStore;

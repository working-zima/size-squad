import { singleton } from 'tsyringe';

import { Store, Action } from 'usestore-ts';

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

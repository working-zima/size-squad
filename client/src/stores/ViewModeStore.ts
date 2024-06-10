import { singleton } from 'tsyringe';
import { Action, Store } from 'usestore-ts';

@singleton()
@Store()
class ViewModeStore {
  isDescriptionView: boolean = true;

  @Action()
  setIsDescriptionView() {
    this.isDescriptionView = !this.isDescriptionView;
  }
}

export default ViewModeStore;

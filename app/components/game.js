import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';

export default class GameComponent extends Component {

  @tracked isShow = false;
  @action toggleShow() {
    this.isShow = !this.isShow;
  }

}

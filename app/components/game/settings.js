import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import { computed } from '@ember/object';


export default class CasinoSettingsComponent extends Component {
  @computed('args.toggleShow')
  get toggleShow() {
    return this.args.toggleShow;
  }
  @computed('args.update')

  get update() {
    return this.args.update;
  }
  @tracked nestedPage = false;

  @action togglePage() {
    this.nestedPage = !this.nestedPage;
  }

  newTitle = '';

  @action onInput(e) {
    this.newTitle = e.target.value
  }

  @action
  async changeTitle(game) {
    if (!this.newTitle) {
      this.toggleShow();
      return;
    }

    const response = await fetch('/api/games/' + game.id, {
      method: 'PUT',
      body: {name: this.newTitle}
    });

    const {message} = await response.json();
    if (message === 'ok') {
      this.update({...game, name: this.newTitle});
      this.toggleShow();
    }
  }
}

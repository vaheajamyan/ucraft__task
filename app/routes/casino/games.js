import Route from '@ember/routing/route';

export default class CasinoGamesRoute extends Route {

  // afterModel(transition) {
  //   if(this.controller) {
  //     this.controller.count = transition.count;
  //     this.controller.page = transition.page;
  //     this.controller.games = transition.games;
  //   }
  // }
  async model() {
    let response = await fetch('/api/games');
    const {games, page, count, search} = await response.json();
    return {games, page, count, search};
  }
}

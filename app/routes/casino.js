import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default class CasinoRoute extends Route {
  async model() {
    return A([
      {
        name: 'Games',
        link: 'casino.games'
      },
      {
        name: 'Categories',
        link: 'casino.categories'
      },
      {
        name: 'Types',
        link: 'casino.types'
      },
      {
        name: 'Providers',
        link: 'casino.providers'
      },
    ])
  }
}

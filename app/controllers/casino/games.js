import Controller from '@ember/controller';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class BlogPostController extends Controller {
  isLoading = false;
  @tracked page = this.model.page;
  @tracked count = this.model.count;
  @tracked games = this.model.games;
  @tracked search = this.model.search;

  @action
  onScroll(e) {
    if (!this.isLoading && e.type === 'input') {
      this.page = 0;
      this.search = e.target.value;
      const params = [];
      if (this.search) {
        params.push(['search', encodeURIComponent(this.search)]);
      }
      params.push(['page', this.page]);
      const url = '/api/games?' + params.map(_ => _.join('=')).join('&');
      fetch(url).then(response => response.json()).then(_ => {
        this.page = _.page;
        this.games = [..._.games];
        this.count = _.count;
        this.isLoading = false;
      });
      return
    }
    if (this.page < this.count && !this.isLoading && e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - 50) {
      this.isLoading = true;
      const params = [];
      if (this.search) {
        params.push(['search', encodeURIComponent(this.search)]);
      }
      params.push(['page', this.page + 1]);
      const url = '/api/games?' + params.map(_ => _.join('=')).join('&');
      fetch(url).then(response => response.json()).then(_ => {
        this.page = _.page;
        this.games = [...this.games, ..._.games];
        this.count = _.count;
        this.isLoading = false;
      });
    }
  }

  @action update(game) {
    this.games = this.games.map((g) => g.id === game.id ? game : g);
  }
}

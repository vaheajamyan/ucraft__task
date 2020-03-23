import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('casino', function () {
    this.route('games');
    this.route('categories');
    this.route('types');
    this.route('providers');
  });
});

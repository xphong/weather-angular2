import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {WeatherService} from '../shared/services/weather';

@Component({
  selector: 'city',
  providers: [
    WeatherService
  ],
  template: require('./city.html')
})
export class City {
  constructor(public weatherService: WeatherService, public routeParams: RouteParams) {

  }
}
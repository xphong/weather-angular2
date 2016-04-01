import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {WeatherService} from '../shared/services/weather';

@Component({
  selector: 'city',
  template: require('./city.html')
})
export class City {
  forecasts = [];
  city = '';
  errorMessage = '';

  constructor(private _weatherService: WeatherService, private _routeParams: RouteParams) {

  }

  ngOnInit() {
    console.log('hello `City` component');

    this.city = this._routeParams.get('city');
    this.searchForWeather();
  }

  searchForWeather() {
    this._weatherService.getForecast(this.city)
        .subscribe(data => {
          if (data) {
            this.forecasts = data;
            this.errorMessage = '';
          } else {
            this.forecasts = [];
            this.errorMessage = 'No forecasts found for this city';
          }
        },
        error => {
          this.forecasts = [];
          this.errorMessage = error.message;
        }
        );
  }
}
import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {WeatherService} from '../shared/services/weather';
import {XLarge} from './directives/x-large';

@Component({
  selector: 'home',
  providers: [
    WeatherService
  ],
  directives: [
    ...FORM_DIRECTIVES,
    XLarge
  ],
  pipes: [ ],
  styles: [ require('./home.css') ],
  template: require('./home.html')
})
export class Home {
  forecasts = [];
  city = '';

  constructor(public weatherService: WeatherService) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

  searchForWeather() {
    this.weatherService.getForecast(this.city)
        .subscribe((data) => {
          if (data.list && data.list.length > 0) {
            this.forecasts = data.list.map((forecast) => {
              return {
                temp: forecast.temp.day + '°C ' + forecast.weather[0].main,
                date: this._convertUTC(forecast.dt),
                humidity: forecast.humidity + '%',
                wind: this._getWindDirection(forecast.deg) + ' ' + forecast.speed + ' km/h',
                pressure: this._formatPressure(forecast.pressure)
              }
            });
          }
        });
  }

  _formatPressure = function (pressure) {
      return Math.round( (pressure / 10) * 10 ) / 10;
  };

  _convertUTC = function (utc) {
    let date = new Date(utc * 1000),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();

    return day + '/' + month + '/' + year;
  };

  _getWindDirection = function (degrees) {
      let direction;

      if (degrees === 0){
        direction = 'N';
      }
      else if (degrees > 0 && degrees < 90) {
        direction = 'NE';
      }
      else if (degrees === 90) {
        direction = 'E';
      }
      else if (degrees > 90 && degrees < 180) {
        direction = 'SE';
      }
      else if (degrees === 180){
        direction = 'S';
      }
      else if (degrees > 180 && degrees < 270) {
        direction = 'SW';
      }
      else if (degrees === 270) {
        direction = 'W';
      }
      else if (degrees > 270 && degrees < 360) {
        direction = 'NW';
      }
      else {
        direction = '';
      }

      return direction;
    };

}

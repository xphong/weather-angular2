import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WeatherService {
  apiUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily';
  apiKey = '0f39b39c55f9f764c41360fbe41282b7';
  apiOptions = '&cnt=7&mode=json&units=metric&appid=' + this.apiKey;

  constructor(public http: Http) {

  }

  getForecast(city) {
    let url = this.apiUrl + '?q=' + city + this.apiOptions;

    return this.http.get(url)
                    .map(res => {
                      var forecasts,
                          response;

                      response = res.json().list;

                      if (response && response.length > 0) {
                        forecasts = response.map(forecast => {
                          return {
                            temp: forecast.temp.day + '°C ' + forecast.weather[0].main,
                            date: this._convertUTC(forecast.dt),
                            humidity: forecast.humidity + '%',
                            wind: this._getWindDirection(forecast.deg) + ' ' + forecast.speed + ' km/h',
                            pressure: this._formatPressure(forecast.pressure)
                          };
                        });
                      }

                      return forecasts;
                    })
                    .catch(this._handleError);
  }

  getCityCountry(city) {
    let url = this.apiUrl + '?q=' + city + this.apiOptions;

    return this.http.get(url)
                    .map(res => {
                      var city,
                          response;

                      response = res.json().city;

                      if (response) {
                        city = response.name + ', ' + response.country;
                      }

                      return city;
                    })
                    .catch(this._handleError);
  }

  _handleError (error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
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

    if (degrees === 0) {
      direction = 'N';
    } else if (degrees > 0 && degrees < 90) {
      direction = 'NE';
    } else if (degrees === 90) {
      direction = 'E';
    } else if (degrees > 90 && degrees < 180) {
      direction = 'SE';
    } else if (degrees === 180) {
      direction = 'S';
    } else if (degrees > 180 && degrees < 270) {
      direction = 'SW';
    } else if (degrees === 270) {
      direction = 'W';
    } else if (degrees > 270 && degrees < 360) {
      direction = 'NW';
    } else {
      direction = '';
    }

    return direction;
  };

}

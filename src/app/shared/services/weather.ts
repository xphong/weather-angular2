import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class WeatherService {
  apiUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily';
  apiKey = '0f39b39c55f9f764c41360fbe41282b7';

  constructor(public http: Http) {

  }

  getForecast(city) {
    let url = this.apiUrl + '?q=' + city + '&cnt=7&mode=json&units=metric&appid=' + this.apiKey;

    return this.http.get(url)
                    .map(res => res.json());
  }

}

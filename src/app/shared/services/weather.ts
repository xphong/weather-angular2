import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class WeatherService {
  constructor(public http: Http) {

  }

  getData() {
    // return this.http.get('/assets/data.json')
    // .map(res => res.json());
    return {
      value: 'AngularClass'
    };
  }

}

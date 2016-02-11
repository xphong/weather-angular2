import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {Title} from '../shared/services/title';
import {XLarge} from './directives/x-large';

@Component({
  selector: 'home',
  providers: [
    Title
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
  data = {};
  city = '';

  constructor(public title: Title) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  searchForWeather() {
	  console.log(this.city);
  }

}

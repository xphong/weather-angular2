import {Component} from 'angular2/core';

@Component({
  selector: 'about',
  template: `patrick@AngularClass.com`
})
export class About {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
  }

}

import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


import {WeatherService} from './weather';

describe('WeatherService', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    WeatherService
  ]);


  it('should have http', inject([ WeatherService ], (weather) => {
    expect(!!weather.http).toEqual(true);
  }));

  it('should get data from the server', inject([ WeatherService ], (weather) => {
    weather.getData();
    expect(weather.getData()).toEqual({ value: 'AngularClass' });
  }));

});

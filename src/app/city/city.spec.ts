import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {RouteParams, ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';

import {City} from './city';
import {WeatherService} from '../shared/services/weather';

describe('City', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(RouteParams, { useValue: new RouteParams({ city: 'toronto' }) }),
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    WeatherService,
    City
  ]);

  it('should have default forecasts', inject([ City ], (city) => {
    expect(city.forecasts).toEqual([]);
  }));

  it('should have default city', inject([ City ], (city) => {
    expect(city.city).toEqual('');
  }));

});

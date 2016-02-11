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


// Load the implementations that should be tested
import {Home} from './home';
import {WeatherService} from '../shared/services/weather';

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    WeatherService,
    Home
  ]);

  it('should have default forecasts', inject([ Home ], (home) => {
    expect(home.forecasts).toEqual([]);
  }));

  it('should log ngOnInit', inject([ Home ], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

  it('should format pressure', inject([ Home ], (home) => {
    expect(home._formatPressure(995.89)).toEqual(99.6);
  }));

  it('should convert UTC time', inject([ Home ], (home) => {
    expect(home._convertUTC(1455210000)).toEqual('11/2/2016');
  }));

  it('should get wind direction', inject([ Home ], (home) => {
    expect(home._getWindDirection('')).toEqual('');
    expect(home._getWindDirection(0)).toEqual('N');
    expect(home._getWindDirection(20)).toEqual('NE');
    expect(home._getWindDirection(90)).toEqual('E');
    expect(home._getWindDirection(110)).toEqual('SE');
    expect(home._getWindDirection(180)).toEqual('S');
    expect(home._getWindDirection(240)).toEqual('SW');
    expect(home._getWindDirection(270)).toEqual('W');
    expect(home._getWindDirection(319)).toEqual('NW');
  }));

});

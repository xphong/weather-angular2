describe('App', () => {

  beforeEach(() => {
    browser.get('/#/city/toronto');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Weather App';
    expect(subject).toEqual(result);
  });

});

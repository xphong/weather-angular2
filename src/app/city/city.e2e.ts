describe('App', () => {

  beforeEach(() => {
    browser.get('/#/city/toronto');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Weather App';
    expect(subject).toEqual(result);
  });

  it('should have <city>', () => {
    let subject = element(by.css('app city')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have a heading with the city name', () => {
    let subject = element(by.css('h2')).getText();
    let result  = 'TORONTO';
    expect(subject).toEqual(result);
  });

  it('should show table with forecast', () => {
    let result  = true;

    browser.sleep(500);

	  browser.findElement(by.css('.table')).then((el) => {
      expect(el.isDisplayed()).toBe(result);
    });
  });
});

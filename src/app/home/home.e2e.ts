describe('App', () => {

  beforeEach(() => {
    browser.get('/#/home');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular2 Webpack Starter by @gdi2990 from @AngularClass';
    expect(subject).toEqual(result);
  });


});

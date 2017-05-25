import { AngularJwtPage } from './app.po';

describe('angular-jwt App', () => {
  let page: AngularJwtPage;

  beforeEach(() => {
    page = new AngularJwtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

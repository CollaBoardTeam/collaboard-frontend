import { CollaboardFrontendPage } from './app.po';

describe('collaboard-frontend App', function() {
  let page: CollaboardFrontendPage;

  beforeEach(() => {
    page = new CollaboardFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

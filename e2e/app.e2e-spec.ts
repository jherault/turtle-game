import { MYAPPPage } from './app.po';

describe('myapp App', function() {
  let page: MYAPPPage;

  beforeEach(() => {
    page = new MYAPPPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

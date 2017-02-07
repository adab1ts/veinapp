import { VeinappPage } from './app.po';

describe('veinapp App', function() {
  let page: VeinappPage;

  beforeEach(() => {
    page = new VeinappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

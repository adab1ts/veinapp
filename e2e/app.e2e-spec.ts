import { VeinappPage } from './app.po';

describe('veinapp App', () => {
  let page: VeinappPage;

  beforeEach(() => {
    page = new VeinappPage();
  });

  xit('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

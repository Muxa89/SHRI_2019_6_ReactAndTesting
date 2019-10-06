/* eslint-disable no-undef */
describe('123', () => {
  it('123', function() {
    return this.browser
      .url('/')
      .keys(['курс доллара к рублю', 'Enter'])
      .isExisting('.converter-form')
      .then(
        () =>
          new Promise(resolve => {
            setTimeout(() => resolve(), 10000);
          })
      );
  });
});

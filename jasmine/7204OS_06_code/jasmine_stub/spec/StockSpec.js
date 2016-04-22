describe("Stock은", function() {
  var stock;
  var originalSharePrice = 0;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'AOUE',
      sharePrice: originalSharePrice
    })
  });

  it("주가를 가진다", function() {
    expect(stock.sharePrice).toEqual(originalSharePrice);
  });

  describe("주식이 조회되면", function() {
    beforeEach(function() {
      spyOn($, 'getJSON').andCallFake(function(url, callback) {
        callback({ sharePrice: 20.13 });
      });

      stock.fetch();
    });

    it("주가를 업데이트해야 한다", function() {
      expect(stock.sharePrice).toEqual(20.13);
    });
  });
});

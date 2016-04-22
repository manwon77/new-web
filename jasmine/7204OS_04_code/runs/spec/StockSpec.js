describe("Stock은", function() {
  var stock;
  var originalSharePrice = 0;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'AOUE',
      sharePrice: originalSharePrice
    });
  });

  it("주가를 가진다", function() {
    expect(stock.sharePrice).toEqual(originalSharePrice);
  });

  it("주가를 업데이트해야 한다", function() {
    var fetched = false;

    runs(function() {
      stock.fetch({
        success: function() {
          fetched = true;
        }
      });
    });

    waitsFor(function (argument) {
      return fetched;
    }, 'Timeout fetching stock data', 2000);

    runs(function() {
      expect(stock.sharePrice).toEqual(20.18);
    });

    runs(function() {
      expect(stock.sharePrice).not.toBeUndefined();
    });

    runs(function() {
      expect(stock.sharePrice).toBeGreaterThan(0);
    });
  });
});

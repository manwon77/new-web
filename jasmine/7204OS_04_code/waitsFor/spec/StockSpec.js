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
    var fetched = false;

    beforeEach(function() {
      stock.fetch({
        success: function () {
          fetched = true;
        }
      });

      waitsFor(function (argument) {
        return fetched;
      }, 'Timeout fetching stock data', 2000);
    });

    it("주가를 업데이트해야 한다", function() {
      expect(stock.sharePrice).toEqual(20.18);
    });
  });
});

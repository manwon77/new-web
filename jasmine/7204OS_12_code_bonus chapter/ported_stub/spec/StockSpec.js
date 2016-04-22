describe("Stock은", function() {
  var stock;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'AOUE'
    });
  });

  describe("주식이 조회되면", function() {
    beforeEach(function() {
      spyOn($, 'getJSON').and.callFake(function(url, callback) {
        callback({ sharePrice: 20.13 });
      });

      stock.fetch();
    });

    it("주가를 업데이트해야 한다", function() {
      expect(stock.sharePrice).toEqual(20.13);
    });
  });
});

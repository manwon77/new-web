describe("Stock은", function() {
  var stock;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'AOUE'
    });
  });

  describe("주식이 조회되면", function() {
    beforeEach(function(done) {
      stock.fetch({
        success: function () {
          done();
        }
      });
    });

    it("주가를 업데이트해야 한다", function() {
      expect(stock.sharePrice).toEqual(20.18);
    });
  });
});

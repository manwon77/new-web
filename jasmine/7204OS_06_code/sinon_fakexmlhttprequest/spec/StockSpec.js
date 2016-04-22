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

  describe("주식이 조회되면", function() {
    var xhr;

    beforeEach(function() {
      var fetchRequest;

      xhr = sinon.useFakeXMLHttpRequest();

      xhr.onCreate = function (request) {
        fetchRequest = request;
      };

      stock.fetch();

      fetchRequest.respond(
        200,
        { "Content-Type": "application/json" },
        '{ "sharePrice": 20.13 }'
      );
    });

    afterEach(function() {
      xhr.restore();
    });

    it("주가를 업데이트해야 한다", function() {
      expect(stock.sharePrice).toEqual(20.13);
    });
  });
});

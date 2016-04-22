describe("Stock은", function() {
  var stock;

  beforeEach(function() {
    stock = new Stock({ symbol: 'AOUE' });
  });

  it("매수 단가의 디폴트값은 0이다", function() {
    expect(stock.get('sharePrice')).toEqual(0);
  });

  it("원격 서버에서 정보를 조회할 수 있어야 한다", function() {
    expect(stock.idAttribute).toEqual('symbol');
    expect(stock.urlRoot).toEqual('/stocks');
  });

  describe("주식이 조회되면", function() {
    var fakeServer;

    beforeEach(function() {
      fakeServer = sinon.fakeServer.create();
      fakeServer.respondWith('/stocks/AOUE', '{ "sharePrice": 20.13 }');

      stock.fetch();

      fakeServer.respond();
    });

    afterEach(function() {
      fakeServer.restore();
    });

    it("주가를 업데이트해야 한다", function() {
      expect(stock.get('sharePrice')).toEqual(20.13);
    });
  });
});

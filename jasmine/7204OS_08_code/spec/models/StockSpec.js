define([
  'spec/SpecHelper',
  'models/Stock'
],
function (jasmine, Stock) {
  describe("Stock은", function() {
    var stock;

    beforeEach(function() {
      stock = new Stock({ symbol: 'YHOO' });
    });

    it("매수 단가의 디폴트값은 0이다", function() {
      expect(stock.get('sharePrice')).toEqual(0);
    });

    it("원격 서버에서 정보를 조회할 수 있어야 한다", function() {
      expect(stock.idAttribute).toEqual('symbol');
      expect(stock.urlRoot).toEqual('/stocks');
    });
  });
});

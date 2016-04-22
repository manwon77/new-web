describe("주식 투자는", function() {
  var stock;
  var investment;

  beforeEach(function() {
    stock = new Stock();
    investment = new Investment({
      stock: stock,
      shares: 100,
      sharePrice: 20
    });
  });

  describe("주가가 매수단가와 같다면", function() {
    beforeEach(function() {
      stock.sharePrice = 20;
    });

    it("불량 투자다", function() {
      expect(investment).not.toBeAGoodInvestment();
    });
  });

  describe("주가가 상승하면", function() {
    beforeEach(function() {
      stock.sharePrice = 40;
    });

    it("우량 투자다", function() {
      expect(investment).toBeAGoodInvestment();
    });
  });

  describe("주가가 하락하면", function() {
    beforeEach(function() {
      stock.sharePrice = 0;
    });

    it("불량 투자다", function() {
      expect(investment).not.toBeAGoodInvestment();
    });
  });
});

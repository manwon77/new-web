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

  it("백본 모델이어야 한다", function() {
    expect(investment).toEqual(jasmine.any(Backbone.Model));
  });

  it("비용이 수반된다", function() {
    expect(investment.get('cost')).toEqual(2000);
  });

  describe("주가가 매수단가와 같다면", function() {
    beforeEach(function() {
      stock.set('sharePrice', 20);
    });

    it("투자 수익률은 0이다", function() {
      expect(investment.get('roi')).toEqual(0);
    });

    it("불량 투자다", function() {
      expect(investment).not.toBeAGoodInvestment();
    });
  });

  describe("주가가 상승하면", function() {
    beforeEach(function() {
      stock.set('sharePrice', 40);
    });

    it("투자 수익률은 양(+)의 값을 가진다", function() {
      expect(investment.get('roi')).toEqual(1);
    });

    it("우량 투자다", function() {
      expect(investment).toBeAGoodInvestment();
    });
  });

  describe("주가가 하락하면", function() {
    beforeEach(function() {
      stock.set('sharePrice', 0);
    });

    it("투자 수익률은 음(-)의 값을 가진다", function() {
      expect(investment.get('roi')).toEqual(-1);
    });

    it("불량 투자다", function() {
      expect(investment).not.toBeAGoodInvestment();
    });
  });

});

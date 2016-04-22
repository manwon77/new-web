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

  it("대상이 주식이어야 한다", function() {
    expect(investment.stock).toBe(stock);
  });

  it("매수 수량이 있어야 한다", function() {
    expect(investment.shares).toEqual(100);
  });

  it("매수 단가가 있어야 한다", function() {
    expect(investment.sharePrice).toEqual(20);
  });

  it("비용이 수반된다", function() {
    expect(investment.cost).toEqual(2000);
  });

  describe("주가가 매수단가와 같다면", function() {
    beforeEach(function() {
      stock.sharePrice = 20;
    });

    it("투자 수익률은 0이다", function() {
      expect(investment.roi()).toEqual(0);
    });

    it("불량 투자다", function() {
      expect(investment.isGood()).toBeFalsy();
    });
  });

  describe("주가가 상승하면", function() {
    beforeEach(function() {
      stock.sharePrice = 40;
    });

    it("투자 수익률은 양(+)의 값을 가진다", function() {
      expect(investment.roi()).toEqual(1);
    });

    it("우량 투자다", function() {
      expect(investment.isGood()).toBeTruthy();
    });
  });

  describe("주가가 하락하면", function() {
    beforeEach(function() {
      stock.sharePrice = 0;
    });

    it("투자 수익률은 음(-)의 값을 가진다", function() {
      expect(investment.roi()).toEqual(-1);
    });

    it("불량 투자다", function() {
      expect(investment.isGood()).toBeFalsy();
    });
  });

});

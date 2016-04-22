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
});

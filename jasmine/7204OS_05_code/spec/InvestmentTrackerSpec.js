describe("주식 투자 조회기 애플리케이션은", function() {
  beforeEach(function() {
    listView = new InvestmentListView({
      id: 'investment-list'
    });

    newView = new NewInvestmentView({
      id: 'new-investment'
    });

    application = new InvestmentTracker({
      listView: listView,
      newView: newView
    });
  });

  describe("신규 투자가 생성되면", function() {
    beforeEach(function() {

    });
    it("투자 종목 리스트에 해당 건이 추가되어야 한다", function() {

    });
  });
});

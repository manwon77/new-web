describe("InvestmentListView는", function() {

  describe("두 건의 투자가 있을 때", function() {
    beforeEach(function() {
      collection = new Backbone.Collection([
        {
          sharePrice: 11,
          stock: new Stock({ symbol: 'AOUE', sharePrice: 10})
        },
        {
          sharePrice: 12,
          stock: new Stock({ symbol: 'COUY', sharePrice: 12})
        }
      ]);

      view = new InvestmentListView({
        collection: collection
      })
    });

    describe("렌더링 시", function() {
      beforeEach(function() {
        view.render();
      });

      it("두 건의 투자를 모두 렌더링해야 한다", function() {
        expect(view.$el).toContainHtml('AOUE');
        expect(view.$el).toContainHtml('COUY');
      });
    });
  });


  describe("추가 투자 시", function() {
    beforeEach(function() {
      collection = new Backbone.Collection();

      investment = new Investment({
        sharePrice: 11,
        stock: new Stock({ symbol: 'AOUE', sharePrice: 10})
      });

      view = new InvestmentListView({
        collection: collection
      });
    });

    describe("렌더링된 투자 목록에서", function() {
      beforeEach(function() {
        view.render();

        collection.add(investment);
      });

      it("투자를 렌더링해야 한다", function() {
        expect(view.$el).toContainHtml('AOUE');
      });
    });

    describe("렌더링되지 않은 투자 목록에서", function() {
      beforeEach(function() {
        collection.add(investment);
      });

      it("투자를 렌더링하지 말아야 한다", function() {
        expect(view.$el).not.toContainHtml('AOUE');
      });
    });
  });


  describe("투자를 삭제 시", function() {
    beforeEach(function() {
      investment = new Investment({
        sharePrice: 11,
        stock: new Stock({ symbol: 'AOUE', sharePrice: 10})
      });

      collection = new Backbone.Collection([investment]);

      view = new InvestmentListView({
        collection: collection
      });
    });

    describe("렌더링된 투자 목록에서", function() {
      beforeEach(function() {
        view.render();

        collection.remove(investment);
      });

      it("투자를 삭제해야 한다", function() {
        expect(view.$el).not.toContainHtml('AOUE');
      });
    });

    describe("렌더링되지 않은 투자 목록에서", function() {
      beforeEach(function() {
        collection.remove(investment);
      });

      it("투자를 렌더링하지 말아야 한다", function() {
        expect(view.$el).not.toContainHtml('AOUE');
      });
    });
  });

});

define([
  'spec/SpecHelper',
  'sinon',
  'backbone',
  'views/InvestmentView',
  'models/Investment',
  'models/Stock'
],
function (jasmine, sinon, Backbone, InvestmentView, Investment, Stock) {
  describe("InvestmentView는", function() {
    var view, investment, stock;

    beforeEach(function() {
      investment = new Investment();

      sinon.spy(InvestmentView.prototype, 'remove');
      sinon.spy(InvestmentView.prototype, 'render');

      view = new InvestmentView({
        model: investment
      });
    });

    afterEach(function() {
      InvestmentView.prototype.remove.restore();
      InvestmentView.prototype.render.restore();
    });


    describe("투자가 삭제될 때", function() {
      beforeEach(function() {
        investment.trigger('destroy', investment);
      });

      it("뷰에서 자신을 삭제해야 한다", function() {
        expect(view.remove).toHaveBeenCalled();
      });
    });


    describe("투자가 변경될 때", function() {
      beforeEach(function() {
        investment.trigger('change', investment);
      });

      it("뷰를 업데이트 해야한다", function() {
        expect(view.render).toHaveBeenCalled();
      });
    });


    describe("렌더링 시", function() {
      beforeEach(function() {
        stock = new Stock();
        sinon.stub(stock, 'get');
        stock.get.withArgs('symbol').returns('YHOO');

        sinon.stub(investment, 'get');
        investment.get.withArgs('roi').returns(0.1);
        investment.get.withArgs('stock').returns(stock);

        view.render();
      });

      it("investment라는 클래스명의 리스트 아이템이어야 한다", function() {
        expect(view.$el).toBe('li.investment');
      });

      it("종목 코드를 렌더링해야 한다", function() {
        expect(view.$el).toContainHtml('YHOO');
      });

      it("ROI를 백분율로 소수점 둘째 자리까지 표시해야 한다", function() {
        expect(view.$el).toContainHtml('10.00%');
      });

      it("투자를 삭제할 수 있는 버튼을 렌더링해야 한다", function() {
        expect(view.$el).toContain('button.destroy-investment');
      });


      describe("불량 투자는", function() {
        beforeEach(function() {
          investment.get.withArgs('isGood').returns(false);
          view.render();
        });

        it("bad-investment라는 CSS 클래스명을 추가해야 한다", function() {
          expect(view.$el).toBe('.bad-investment');
        });
      });


      describe("우량 투자는", function() {
        beforeEach(function() {
          investment.get.withArgs('isGood').returns(true);
          view.render();
        });

        it("good-investment라는 CSS 클래스명을 추가해야 한다", function() {
          expect(view.$el).toBe('.good-investment');
        });
      });


      describe("삭제 버튼을 클릭했을 때", function() {
        beforeEach(function() {
          sinon.spy(investment, 'destroy');
          view.$('.destroy-investment').click();
        });

        it("모델을 삭제해야 한다", function() {
          expect(investment.destroy).toHaveBeenCalled();
        });
      });
    });

  });
});

define([
  'spec/SpecHelper',
  'sinon',
  'backbone',
  'jquery',
  'models/StockCollection',
  'models/Stock'
],
function (jasmine, sinon, Backbone, $, StockCollection, Stock) {
  describe("StockCollection은", function() {
    var collection, fakeServer;

    beforeEach(function() {
      fakeServer = sinon.fakeServer.create();
      fakeServer.respondWith(JSON.stringify([
        {
          symbol: 'YHOO',
          sharePrice: 20.13
        },
        {
          symbol: 'GOOG',
          sharePrice: 14
        }
      ]));
    });

    afterEach(function() {
      fakeServer.restore();
    });


    describe("어떤 콜렉션이 있을 때", function() {
      beforeEach(function() {
        collection = new StockCollection();
      });

      it("백본 콜렉션이어야 한다", function() {
        expect(collection).toEqual(jasmine.any(Backbone.Collection));
      });

      it("Stock 모델의 콜렉션이다", function() {
        expect(collection.model).toBe(Stock);
      });
    });


    describe("빈 콜렉션일 때", function() {
      beforeEach(function() {
        collection = new StockCollection();
      });

      describe("조회 시", function() {
        beforeEach(function() {
          collection.fetch();
          fakeServer.respond();
        });

        it("루트 stocks URL을 서버에 요청해야 한다", function() {
          var url = '/stocks';
          expect(fakeServer.requests[0].url).toEqual(url);
        });

        it("정확한 매수 단가로 모델을 생성할 수 있어야 한다", function() {
          expect(collection.get('YHOO').get('sharePrice')).toEqual(20.13);
          expect(collection.get('GOOG').get('sharePrice')).toEqual(14);
        });
      });
    });


    describe("콜렉션이 모델로 채워져 있다면", function() {
      var model1, model2;

      beforeEach(function() {
        model1 = new Stock({ symbol: 'YHOO' });
        model2 = new Stock({ symbol: 'GOOG' });

        collection = new StockCollection([
          model1,
          model2
        ]);
      });

      describe("조회 시", function() {
        beforeEach(function() {
          collection.fetch();
          fakeServer.respond();
        });

        it("콜렉션에 포함된 종목 코드를 요청해야 한다", function() {
          // '/stocks?ids[]=YHOO&ids[]=GOOG'로 인코딩
          var url = '/stocks?' + $.param({ ids: ['YHOO', 'GOOG'] });

          expect(fakeServer.requests[0].url).toEqual(url);
        });

        it("주식 모델의 주가를 업데이트해야 한다", function() {
          expect(model1.get('sharePrice')).toEqual(20.13);
          expect(model2.get('sharePrice')).toEqual(14);
        });
      });
    });
  });
});

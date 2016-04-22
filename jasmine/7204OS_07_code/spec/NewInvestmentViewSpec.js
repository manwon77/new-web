describe("NewInvestmentView는", function() {
  var view;

  beforeEach(function() {
    view = new NewInvestmentView({
      id: 'new-investment'
    });

    setFixtures(view.$el);

    view.render();
  });

  it("백본 뷰여야 한다", function() {
    expect(view).toEqual(jasmine.any(Backbone.View));
  });

  it("DOM 엘리먼트를 프로퍼티로 노출시켜야 한다", function() {
    expect(view.$el).toExist();
  });

  it("종목 코드를 입력받아야 한다", function() {
    expect(view.$el.find('.new-investment-stock-symbol')).toBe('input[type=text]');
  });

  it("매수 수량을 입력받아야 한다", function() {
    expect(view.$el).toContainHtml('<input type="number" class="new-investment-shares" name="shares" value="0">');
  });

  it("매수 단가를 입력받아야 한다", function() {
    expect(view.$el).toContain('input[type=number].new-investment-share-price');
  });

  itShouldBeAtTheDefaultState();

  describe("입력 항목이 정확히 기재되었다면", function() {
    beforeEach(function() {
      view.$el.find('.new-investment-stock-symbol').val('AOUE').trigger('change');
      view.$el.find('.new-investment-shares').val(100).trigger('change');
      view.$el.find('.new-investment-share-price').val(20).trigger('change');
    });

    it("추가할 수 있어야 한다", function() {
      expect(view.$el.find('input[type=submit]')).not.toBeDisabled();
    });

    it("입력받는대로 신규 투자를 생성할 수 있어야 한다", function() {
      var newInvestment = view.create();
      expect(newInvestment.get('stock').get('symbol')).toEqual('AOUE');
      expect(newInvestment.get('shares')).toEqual(100);
      expect(newInvestment.get('sharePrice')).toEqual(20);
    });

    describe("Add 버튼을 클릭했을 때", function() {
      beforeEach(function() {
        spyOnEvent(view.$el, 'submit');

        view.$el.find('input[type=submit]').click();
      });

      it("폼이 전송되어야 한다", function() {
        expect('submit').toHaveBeenTriggeredOn(view.$el);
      });
    });

    describe("그리고 폼이 전송될 때", function() {
      beforeEach(function() {
        spyOn(view, 'create');
        spyOnEvent(view.$el, 'submit');

        view.$el.submit();
      });

      it("이벤트의 디폴트 행위는 금지되어야 한다", function() {
        expect('submit').toHaveBeenPreventedOn(view.$el);
      });

      it("신규 투자를 생성해야 한다", function() {
        expect(view.create).toHaveBeenCalled();
      });

      itShouldBeAtTheDefaultState();
    });

    describe("그리고 신규 투자가 생성될 때", function() {
      var callbackSpy;
      var investment;

      beforeEach(function() {
        callbackSpy = jasmine.createSpy('callback');
        view.on('create', callbackSpy);

        investment = view.create();
      });

      it("investment를 파라미터로 onCreate 콜백 함수를 실행해야 한다", function() {
        expect(callbackSpy).toHaveBeenCalled();
        expect(callbackSpy).toHaveBeenCalledWith(investment);

        expect(callbackSpy.wasCalled).toBeTruthy();
        expect(callbackSpy.mostRecentCall.args[0]).toBe(investment);
      });
    });

    describe("종목 코드 입력부가 초기화되었다면", function() {
      beforeEach(function() {
        view.$el.find('.new-investment-stock-symbol').val('').trigger('change');
      });

      itShouldNotAllowToAdd();
    });

    describe("매수 수량 입력부가 초기화되었다면", function() {
      beforeEach(function() {
        view.$el.find('.new-investment-shares').val('').trigger('change');
      });

      itShouldNotAllowToAdd();
    });

    describe("매수 단가 입력부가 초기화되었다면", function() {
      beforeEach(function() {
        view.$el.find('.new-investment-share-price').val('').trigger('change');
      });

      itShouldNotAllowToAdd();
    });
  });

  // shared specs

  function itShouldNotAllowToAdd () {
    it("더 이상 추가할 수 없다", function() {
      expect(view.$el.find('input[type=submit]')).toBeDisabled();
    });
  }

  function itShouldBeAtTheDefaultState () {
    it("빈 종목 코드를 가져야 한다", function() {
      expect(view.$el.find('.new-investment-stock-symbol')).toHaveValue('');
    });

    it("매수 수량이 0이어야 한다", function() {
      expect(view.$el.find('.new-investment-shares')).toHaveValue('0');
    });

    it("매수 단가가 0이어야 한다", function() {
      expect(view.$el.find('.new-investment-share-price')).toHaveAttr('value', '0');
    });

    it("종목 코드 입력부에 포커싱되어야 한다", function() {
      expect(view.$el.find('.new-investment-stock-symbol')).toBeFocused();
    });

    itShouldNotAllowToAdd();
  }
});

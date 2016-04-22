describe("InvestmentsRouter는", function() {
  var router, observer;

  beforeEach(function() {
    router = new InvestmentsRouter();
    observer = sinon.spy();
  });

  it("백본 라우터여야 한다", function() {
    expect(router).toEqual(jasmine.any(Backbone.Router));
  });

  it("/investments/good로 라우팅되어야 한다", function() {
    router.on('route:goodInvestments', observer);

    Backbone.history.loadUrl('/investments/good');

    expect(observer).toHaveBeenCalled();
  });

  it("/investments/bad로 라우팅되어야 한다", function() {
    router.on('route:badInvestments', observer);

    Backbone.history.loadUrl('/investments/bad');

    expect(observer).toHaveBeenCalled();
  });

  it("/investments/all로 라우팅되어야 한다", function() {
    router.on('route:allInvestments', observer);

    Backbone.history.loadUrl('/investments/all');

    expect(observer).toHaveBeenCalled();
  });
});

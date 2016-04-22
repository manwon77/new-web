beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    },
    toBeAGoodInvestment: function(){
      // 재스민 매처기는 기대식이 참이면 true , 아니면 false4
      // 매처를 구현하려면 실제값 을 참조
      var investment = this.actual;

      this.message = function(){
        return 'Expected investment to be a good investment';
      };

      return investment.isGood();
    }
  });
});

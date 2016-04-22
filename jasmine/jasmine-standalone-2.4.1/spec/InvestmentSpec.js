/**
 * Created by tour151127 on 2016-02-15.
 */

// describe 는 테스트 컨텍스트로 자스민 전역함수, 다음 인자 2개를 전달받아 테스트 스위트를 정의
describe("주식투자는", function(){
    var stock, investment;

    // 중복을 피하기 위해 재시민은 beforeEach라는 전역함수를 제공, 이 함수는 각 스펙의 실행 전 호출 , 스펙이 2개라면 스펙당 한번씩 총 2번 실행
    beforeEach(function(){
        stock = new Stock();
        investment = new Investment({
            stock: stock,
            shares: 100,
            sharePrice: 20
        })
    });

    describe("주가가 상승하면", function(){
        beforeEach(function(){
            stock.sharePrice = 40;
        })
        it("투자 수익률은 양(+)의 값을 가진다", function(){
            expect(investment.roi()).toEqual(1);
        });
        it("우량 투자다", function(){
            expect(investment.isGood()).toBeTruthy();
        });
    });

    // it함수의 인자는 2개다
    it("대상이 주식이어야 한다", function(){
        // 어셜션(assertion) 은 두 값을 비교해서 불린값을 리턴하는 표현식
        // 리턴 값이 참(true) 이면 어셜션은 성공한 것으로 간주
        // 재스민에서 어셜션은 전역함수 expect를 사용하여 작성 하고, 그 뒤에 매처(matcher)로 어떤 비교를 해야 할지 나타낸다

        //var stock = new Stock();
        //var investment = new Investment(stock);
        expect(investment.stock).toBe(stock);
        // code 설명
        // expect 함수는 실제값 actual value 테스트 대상의 되는 데이터(investment.stock)하나만 인자로 취하는데, 항상 바로 뒤에 매처(matcher)함수가
        // 체이닝 콜(chaining call)방식으로 호출
        // 기댓값(expected value)은 stock이고 이 값이 실제값과 동일한지(to be the same) 여부를 알아보는 것
    });
    it("매수 수량이 있어야 한다", function(){

        //var stock = new Stock();
        //var investment = new Investment({
        //    stock: stock,
        //   shares:100
        //});
        expect(investment.shares).toEqual(100);
    });
    it("매수 단가가 있어야 한다", function(){
        expect(investment.sharePrice).toEqual(20);
    });
    it("비용이 수반된다", function(){
        expect(investment.cost).toEqual(2000);
    });
    it("우량 투자다", function(){
        expect(investment).not.toBeAGoodInvestment();
    });

    describe("주가가 하락하면", function(){
        beforeEach(function(){
            stock.sharePrice = 0;
        });
        it("불량 투자다", function(){
            expect(investment).not.toBeAGoodInvestment();
        })
    });


})
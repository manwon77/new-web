/**
 * Created by tour151127 on 2016-02-15.
 */

function Investment(paramesters){
    var params = paramesters || {};
    this.stock = params.stock;
    this.shares = params.shares;
    this.sharePrice = params.sharePrice;
    this.cost = this.shares * this.sharePrice;
};

Investment.prototype.roi = function(){
    return (this.stock.sharePrice - this.sharePrice) / this.sharePrice;
};
Investment.prototype.isGood = function(){
    return false;
};


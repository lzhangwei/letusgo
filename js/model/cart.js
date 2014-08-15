/**
 * Created by zhangwei on 14-8-15.
 */
function Cart(){
    var init = function (cartItemList) {

        for(var i = 0; i < localStorage.cartItemCount; i++){
            cartItemList.push(
                JSON.parse(localStorage.getItem('cartItem' + i)));
        }

    };

    this.cartItemList = [];

    init(this.cartItemList);
}

Cart.prototype.storageCartItemList = function() {
    for(var i = 0; i < this.cartItemList.length; i++){
        localStorage.setItem('cartItem'+i,JSON.stringify(this.cartItemList[i]));
    }
};

Cart.prototype.getCartItemList = function() {

    return this.cartItemList;
};

Cart.prototype.addCartItem = function(curitem) {

    var curCartItem = _.find(this.cartItemList, {'item':curitem});
    if(curCartItem!==undefined){
        _.find(this.cartItemList,function(object){
            if(object.item.barcode === curitem.barcode){
                object.num++;
            }
        });
    }else{
        var cartItem = new CartItem(curitem,1);
        this.cartItemList.push(cartItem);
        localStorage.cartItemCount = +localStorage.cartItemCount + 1;
    }
    localStorage.amounts = +localStorage.amounts + 1;
};

Cart.prototype.removeCartItem = function(storageItem) {
    var curitem = JSON.parse(storageItem);
    _.find(this.cartItemList,function(object){
        if(object.item.barcode === curitem.barcode){
            object.num--;
        }
    });
};

Cart.prototype.categoryCartItem = function() {
    var cartItemGroup = _.map(_.groupBy(this.cartItemList, function(cartItem) {
        return cartItem.item.category;
    }));
    return cartItemGroup;
};
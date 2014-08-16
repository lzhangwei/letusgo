/**
 * Created by zhangwei on 14-8-15.
 */
function Cart(){
    this.cartItemList = Storage.getArrayItem('cartItems') || [];
}

Cart.prototype.getCartItemList = function() {

    return this.cartItemList;
};

Cart.prototype.addCartItem = function(curitem) {

    var curCartItem = _.find(this.cartItemList, {'item':curitem});

    if(curCartItem!==undefined){
        curCartItem.num++;
        Storage.changeArrayItem('cartItems',curCartItem);
    }else{
        var cartItem = new CartItem(curitem,1);
        this.cartItemList.push(cartItem);
        Storage.addArrayItem('cartItems',cartItem);
    }
    var t2 = +Storage.getItem('amounts') + 1;
    Storage.addItem('amounts',t2);
};

Cart.prototype.reduceCartItem = function(curitem) {
    var curCartItem = _.find(this.cartItemList, {'item':curitem});
    curCartItem.num--;
    if(curCartItem.num > 0){
        Storage.changeArrayItem('cartItems',curCartItem);
    } else {
        Storage.removeInArray('cartItems',curCartItem);
    }
    var t2 = +Storage.getItem('amounts') - 1;
    Storage.addItem('amounts',t2);
};

Cart.prototype.categoryCartItem = function() {
    var cartItemGroup = _.map(_.groupBy(this.cartItemList, function(cartItem) {
        return cartItem.item.category;
    }));
    return cartItemGroup;
};
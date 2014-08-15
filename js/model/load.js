/**
 * Created by zhangwei on 14-8-14.
 */
function loadAllItems() {
    localStorage.setItem('amounts',0);
    localStorage.setItem('itemCount',0);
    localStorage.setItem('cartItemCount',0);
    var item1 = new Item('ITEM000000', '可口可乐', '瓶', 3.00, '饮料');
    item1.storageItem();
    var item2 = new Item('ITEM000001', '雪碧', '瓶', 3.00, '饮料');
    item2.storageItem();
    var item3 = new Item('ITEM000002', '苹果', '斤', 5.50, '水果');
    item3.storageItem();
    var item4 = new Item('ITEM000003', '荔枝', '斤', 15.00, '水果');
    item4.storageItem();
    var item5 = new Item('ITEM000004', '电池', '个', 2.00, '生活用品');
    item5.storageItem();
    var item6 = new Item('ITEM000005', '方便面', '袋', 4.50, '食品');
    item6.storageItem();
}

function getItemCount(){
    return Number(localStorage.itemCount);
}

function getStorageItem(item){
    return JSON.parse(localStorage.getItem(item));
}

function getAmounts(){
    return localStorage.amounts;
}

function cleanStorage(){
    for(var i = 0; i < localStorage.cartItemCount; i++){
        localStorage.removeItem('cartItem' + i);
    }
    localStorage.setItem('amounts',0);
    localStorage.setItem('cartItemCount',0);
    $('.amount').text(getAmounts());
}
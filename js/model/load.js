/**
 * Created by zhangwei on 14-8-14.
 */
function loadAllItems() {
    Storage.removeItem('items');
    Storage.removeItem('cartItems');
    Storage.addItem('amounts',0);
    Storage.addItem('itemCount',0);
    Storage.addItem('cartItemCount',0);
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

function getItemList(name){
    return Storage.getArrayItem(name);
}

function getAmounts(){
    return Number(Storage.getItem('amounts'));
}

function cleanStorage(){
    Storage.removeItem('cartItems');
    Storage.addItem('amounts',0);
    $('.amount').text(getAmounts());
}
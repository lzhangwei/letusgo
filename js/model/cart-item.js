function CartItem(item, num){
  this.item = item;
  this.num = num;
  this.promotionNum = 0;
}

CartItem.prototype.smallCal = function() {
  return this.item.price * (this.num - this.promotionNum);
};

CartItem.prototype.getBarcode = function() {
  return this.item.barcode;
};

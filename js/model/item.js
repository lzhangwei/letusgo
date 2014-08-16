function Item(barcode, name, unit, price,category) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price || 0.00;
    this.category = category;
}

Item.prototype.storageItem = function() {
    var itemCount = Number(Storage.getItem('itemCount'));
    Storage.addItem('item'+itemCount,JSON.stringify(this));
    var t = +Storage.getItem('itemCount') + 1;
    Storage.addItem('itemCount',t);
};
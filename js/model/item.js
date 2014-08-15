function Item(barcode, name, unit, price,category) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price || 0.00;
    this.category = category;
}

Item.prototype.storageItem = function() {
    var itemCount = Number(localStorage.getItem('itemCount'));
    localStorage.setItem('item'+itemCount,JSON.stringify(this));
    localStorage.itemCount = +localStorage.itemCount + 1;
};
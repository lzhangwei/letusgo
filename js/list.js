$(document).ready(function () {

    $('.amount').text(getAmounts());

    if ($('#goodlist-table').length > 0) {
        var itemlist = getItemList('items');
        for (var j = 0; j < itemlist.length; j++) {
            var item = itemlist[j];
            $('#goodlist-table').append(
                    '<tr><td>' + item.category + '</td><td>' + item.name + '</td><td>' + item.price
                    + '</td><td>' + item.unit + '</td><td>' + '<input id="item' + j
                    + '" class="btn btn-primary btn-sm addcart" type="button" value="加入购物车">'
                    + '</td><tr>'
            );
        }
        var cart = new Cart();
        $('.addcart').on('click', function () {
            var itemid = +$(this)[0].id.substring(4);
            var item = Storage.getArrayItem('items')[itemid];
            cart.addCartItem(item);

            $('.amount').text(getAmounts());
        });

    }

});
$(document).ready(function () {

    $('.amount').text(getAmounts());

    if ($('#goodlist-table').length > 0) {
        for (var j = 0; j < getItemCount(); j++) {
            var item = getStorageItem('item' + j);
            $('#goodlist-table').append(
                    '<tr><td>' + item.category + '</td><td>' + item.name + '</td><td>' + item.price
                    + '</td><td>' + item.unit + '</td><td>' + '<input id="item' + j
                    + '" class="btn btn-primary btn-sm addcart" type="button" value="加入购物车">'
                    + '</td><tr>'
            );
        }
        var cart = new Cart();
        $('.addcart').on('click', function () {

            var cartItem = getStorageItem($(this)[0].id);
            cart.addCartItem(cartItem);
            $('.amount').text(getAmounts());
            cart.storageCartItemList();
        });

    }

});


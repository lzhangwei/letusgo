$(document).ready(function () {
    $('.amount').text(getAmounts());
    $('.payok').on('click', function () {
        cleanStorage();
        $('.amount').text(0);
    });

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

    if ($('#cartpanels').length > 0) {
        var sumprice = 0;
        var cart = new Cart();
        var cartItemGroup = cart.categoryCartItem();
        for (var k = 0; k < cartItemGroup.length; k++) {
            var category = cartItemGroup[k];
            $('#cartpanels').append(
                    '<div id="cartpanel' + k + '" class="panel panel-default"></div>'
            );
            $('#cartpanel' + k).append(
                    '<div class="panel-heading"><h4>' + category[0].item.category + '</h4></div>'
            );
            $('#cartpanel' + k).append(
                    '<div class="panel-body"><table id="category_table' + k
                    + '" class="table table-responsive table-bordered text-center">'
                    + '</table></div>'
            );
            $('#category_table' + k).append(
                    '<tr><th class="text-center">名称</th><th class="text-center">单价(元)</th>'
                    + '<th class="text-center">单位</th><th class="text-center">数量</th>'
                    + '<th class="text-center">小计</th></tr>'
            );
            for (var i = 0; i < category.length; i++) {
                sumprice += category[i].item.price * category[i].num;
                $('#category_table' + k).append(
                        '<tr><td>' + category[i].item.name
                        + '</td><td>' + category[i].item.price
                        + '</td><td>' + category[i].item.unit
                        + '</td><td>' + '<div class="btn-group">'
                        + '<button type="button" class="btn btn-default">-</button>'
                        + '<button type="button" class="btn btn-default" disabled="disabled">'
                        + category[i].num +'</button>'
                        + '<button type="button" class="btn btn-default">+</button></div>'
                        + '</td><td>' + (category[i].item.price * category[i].num) + '</td></tr>'
                );
            }
            $('#total').text(sumprice);
        }
    }

    if ($('#inventory').length > 0) {
        var date = moment(new Date()).format("YYYY年MM月DD日 HH:mm:ss");
        $('#curdate').text(date);
        var cart = new Cart();
        var cartItemlist = cart.getCartItemList();
        var inventorytotal = 0;
        for (var i = 0; i < cartItemlist.length; i++) {
            inventorytotal += cartItemlist[i].item.price * cartItemlist[i].num;
            $('#inventory-table').append(
                    '<tr><td>' + cartItemlist[i].item.category
                    + '</td><td>' + cartItemlist[i].item.name
                    + '</td><td>' + cartItemlist[i].item.price
                    + '</td><td>' + cartItemlist[i].item.unit
                    + '</td><td>' + cartItemlist[i].num
                    + '</td><td>' + (cartItemlist[i].item.price * cartItemlist[i].num) + '</td></tr>'
            );
        }
        $('#inventorytotal').text(inventorytotal);
    }

});


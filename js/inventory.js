/**
 * Created by zhangwei on 14-8-16.
 */
$(document).ready(function () {

    $('.amount').text(getAmounts());
    
    $('.payok').on('click', function () {
        cleanStorage();
        $('.amount').text(0);
    });

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
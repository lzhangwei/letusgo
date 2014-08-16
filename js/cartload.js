/**
 * Created by zhangwei on 14-8-15.
 */
$(document).ready(function(){

    var sumprice = 0;
    var cart = new Cart();
    var cartItemGroup = cart.categoryCartItem();

    if ($('#cartpanels').length > 0) {

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
                        '<tr id="cartpaneltable'+k+i+'"><td>' + category[i].item.name
                        + '</td><td>' + category[i].item.price
                        + '</td><td>' + category[i].item.unit
                        + '</td><td>' + '<div class="btn-group">'
                        + '<button id="cartItemRemove' + k + i + '" type="button" class="btn btn-default">-</button>'
                        + '<button id="cartItemNums' + k + i + '" type="button" class="btn btn-default" disabled="disabled">'
                        + category[i].num +'</button>'
                        + '<button id="cartItemAdd' + k + i + '" type="button" class="btn btn-default">+</button></div>'
                        + '</td><td id="cartpaneltablesmallcal'+k+i+'">' + (category[i].item.price * category[i].num) + '</td></tr>'
                );

                $('#cartItemRemove'+k+i).on('click', function () {
                    var ii = +$(this)[0].id.substring(14,15);
                    var jj = +$(this)[0].id.substring(15);
                    var cartItem = cartItemGroup[ii][jj];
                    cart.reduceCartItem(cartItem.item);
                    if(+$('#cartItemNums'+ii+jj).text() > 1){
                        $('#cartItemNums'+ii+jj).text(+$('#cartItemNums'+ii+jj).text() - 1);
                    } else {
                        if(cartItemGroup[ii].length === 1){
                            $('#cartpanel' + ii).remove();
                            if(cart.cartItemList.length === 0){
                                cartItemGroup = [];
                                $('#cartfoot').remove();
                                addFoot(cartItemGroup);
                            }
                        } else {
                            $('#cartpaneltable' + ii + jj).remove();
                        }
                    }
                    $('#cartpaneltablesmallcal'+ii+jj).text(cartItem.item.price * cartItem.num);
                    $('.amount').text(getAmounts());
                    sumprice -= cartItem.item.price;
                    $('#total').text(sumprice);
                });

                $('#cartItemAdd'+k+i).on('click', function () {
                    var ii = +$(this)[0].id.substring(11,12);
                    var jj = +$(this)[0].id.substring(12);
                    var cartItem = cartItemGroup[ii][jj];
                    cart.addCartItem(cartItem.item);
                    $('#cartItemNums'+ii+jj).text(+$('#cartItemNums'+ii+jj).text() + 1);
                    $('#cartpaneltablesmallcal'+ii+jj).text(cartItem.item.price * cartItem.num);
                    $('.amount').text(getAmounts());
                    sumprice += cartItem.item.price;
                    $('#total').text(sumprice);
                });

            }
            $('#total').text(sumprice);
        }

        addFoot(cartItemGroup);

    }

});

function addFoot(cartItemGroup){
    if(cartItemGroup.length === 0) {
        $('#cartpanels').append(
                '<div class="text-center"><div><span>购物车中没有商品！</span></div>'
                +'<a class="btn btn-primary btn-lg" role="button" href="list.html">返回商城添加商品</a></div>'
        );
    } else {
        $('#cartpanels').append(
                '<div id="cartfoot" class="text-right"><label>总计：<span id="total">0.00元</span></label><div>'
                +'<a class="btn btn-primary btn-lg" role="button" href="inventory.html">付款</a></div></div>'
        );
    }
}
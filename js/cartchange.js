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
                        '<tr><td>' + category[i].item.name
                        + '</td><td>' + category[i].item.price
                        + '</td><td>' + category[i].item.unit
                        + '</td><td>' + '<div class="btn-group">'
                        + '<button id="cartItemRemove' + k + i + '" type="button" class="btn btn-default">-</button>'
                        + '<button id="cartItemNums' + k + i + '" type="button" class="btn btn-default" disabled="disabled">'
                        + category[i].num +'</button>'
                        + '<button id="cartItemAdd' + k + i + '" type="button" class="btn btn-default">+</button></div>'
                        + '</td><td>' + (category[i].item.price * category[i].num) + '</td></tr>'
                );

                $('#cartItemRemove'+k+i).on('click', function () {

                });

                $('#cartItemAdd'+k+i).on('click', function () {

                });

//                $('#cartItemNums'+k+i).text(category[i].num);

            }
            $('#total').text(sumprice);
        }
    }

});
$(document).ready(function () {
    if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if(localStorage.amounts === undefined){
            localStorage.setItem('amounts', 0);
        }else{
            $('.amount').text(localStorage.amounts);
        }

        if(localStorage.itemCount === undefined){
            var itemlist = loadAllItems();
            localStorage.setItem('itemCount', itemlist.length);
            for(var i = 0; i < itemlist.length; i++){
                localStorage.setItem('item' + i,JSON.stringify(itemlist[i]));
                //var item = JSON.parse(localStorage.getItem('item' + i));
            }
        }
    } else {
        // Sorry! No Web Storage support..
        alert('浏览器不支持Web Storage！');
    }

    $('.payok').on('click',function(){
        for(var i = 0; i < localStorage.itemCount; i++){
            localStorage.removeItem('item' + i);
            localStorage.removeItem('cartItem' + i);
        }
        localStorage.removeItem('itemCount');
        localStorage.amounts = 0;
        $('.amount').text(localStorage.amounts);
    });

    if($('#goodlist-table').length>0){
        for(var j = 0;j < localStorage.getItem('itemCount'); j++ ){
            var item = JSON.parse(localStorage.getItem('item' + j));
            $('#goodlist-table').append(
                '<tr><td>'+item.category+'</td><td>'+item.name+'</td><td>'+item.price
                +'</td><td>'+item.unit+'</td><td>'+'<input id="item'+j
                +'" class="btn btn-primary btn-sm addcart" type="button" value="加入购物车">'
                +'</td><tr>'
            );
        }
        $('.addcart').on('click',function(){
            var item = JSON.parse(localStorage.getItem($(this)[0].id));
            var cartItem = new CartItem(item,1);
            localStorage.setItem('cartItem'+localStorage.amounts,JSON.stringify(cartItem));
            localStorage.amounts = Number(localStorage.amounts) + 1;
            $('.amount').text(localStorage.amounts);
        });
    }

    if($('#cartpanels').length>0){
        var sumprice = 0;
        var cartItemGroup = getCartItemGroup();
        for(var k = 0; k < cartItemGroup.length; k++){
            var category = cartItemGroup[k];
            //var c = category[0].item.category;
            $('#cartpanels').append(
                '<div id="cartpanel'+k+'" class="panel panel-default"></div>'
            );
            $('#cartpanel'+k).append(
                '<div class="panel-heading"><h4>'+category[0].item.category+'</h4></div>'
            );
            $('#cartpanel'+k).append(
                '<div class="panel-body"><table id="category_table' + k
                    + '" class="table table-responsive table-bordered text-center">'
                    +'</table></div>'
            );
            $('#category_table' + k).append(
                '<tr><th class="text-center">名称</th><th class="text-center">单价(元)</th>'
                    +'<th class="text-center">单位</th><th class="text-center">数量</th>'
                    +'<th class="text-center">小计</th></tr>'
            );
            for(var i = 0; i < category.length; i++){
                sumprice += category[i].item.price*category[i].num;
                $('#category_table' + k).append(
                    '<tr><td>'+category[i].item.name
                        +'</td><td>'+category[i].item.price
                        +'</td><td>'+category[i].item.unit
                        +'</td><td>'+category[i].num
                        +'</td><td>'+(category[i].item.price*category[i].num)+'</td></tr>'
                );
            }
            $('#total').text(sumprice);
        }
    }

    if($('#inventory').length>0){
        var date = moment(new Date()).format("YYYY年MM月DD日 HH:mm:ss");
        $('#curdate').text(date);
        var cartItemlist = getCartItemlist();
        var inventorytotal = 0;
        for(var i = 0; i < cartItemlist.length; i++){
            inventorytotal += cartItemlist[i].item.price*cartItemlist[i].num;
            $('#inventory-table').append(
                '<tr><td>'+cartItemlist[i].item.category
                +'</td><td>'+cartItemlist[i].item.name
                +'</td><td>'+cartItemlist[i].item.price
                +'</td><td>'+cartItemlist[i].item.unit
                +'</td><td>'+cartItemlist[i].num
                +'</td><td>'+(cartItemlist[i].item.price*cartItemlist[i].num)+'</td></tr>'
            );
        }
        $('#inventorytotal').text(inventorytotal);
    }

});

function getCartItemlist(){
    var cartItemlist = [];
    if(Number(localStorage.amounts)>0){
        for(var t = 0; t < Number(localStorage.amounts); t++){
            cartItemlist.push(JSON.parse(localStorage.getItem('cartItem' + t)));
        }
    }
    for(var i = 0; i < cartItemlist.length; i++){
        for(var j = 0; j < i; j++){
            if(cartItemlist[i].item.barcode === cartItemlist[j].item.barcode){
                cartItemlist[j].num += cartItemlist[i].num;
                cartItemlist.splice(i, 1);
                i--;
                break;
            }
        }
    }
    return cartItemlist;
}

function getCartItemGroup(){
    var cartItemlist = getCartItemlist();

    var cartItemGroup = _.map(_.groupBy(cartItemlist, function(cartItem) {
        return cartItem.item.category;
    }));
    return cartItemGroup;
}


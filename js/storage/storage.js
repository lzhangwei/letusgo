/**
 * Created by zhangwei on 14-8-15.
 */
function Storage(){
}

Storage.addArrayItem = function(name,item){
    if(localStorage.getItem(name) == undefined){
        localStorage.setItem(name,JSON.stringify([item]));
    }else{
        var list=JSON.parse(localStorage.getItem(name));
        list.push(item);
        localStorage.setItem(name,JSON.stringify(list));
    }
}

Storage.getArrayItem = function(name){
    return JSON.parse(localStorage.getItem(name));
}

Storage.changeArrayItem = function(name,cartitem){

    if(localStorage.getItem(name) !== undefined){
        var cartItemList = JSON.parse(localStorage.getItem(name));
        _.find(cartItemList,function(object){
            if(object.item.barcode === cartitem.item.barcode){
                object.num = cartitem.num;
            }
        });
        localStorage.setItem(name,JSON.stringify(cartItemList));
    }
}

Storage.addItem = function(name,value){
    localStorage.setItem(name,value);
}

Storage.getItem = function(name){
    return localStorage.getItem(name);
}

Storage.removeInArray = function(name,item){
    if(localStorage.getItem(name)!==undefined){
        var list=JSON.parse(localStorage.getItem(name));
        _.remove(list,function(i){return i.item.barcode===item.item.barcode});
        localStorage.setItem(name,JSON.stringify(list));
    }
}

Storage.removeItem = function(name){
    localStorage.removeItem(name);
}
/**
 * Created by zhangwei on 14-8-15.
 */
function Storage(){
}

Storage.addArrayItem = function(name,item){
    if(localStorage[name] == undefined){
        localStorage[name]=JSON.stringify([item]);
    }else{
        var list=JSON.parse(localStorage[name]);
        list.push(item);
        localStorage[name]=JSON.stringify(list);
    }
}

Storage.addItem = function(name,value){
    localStorage.setItem(name,value);
}

Storage.getItem = function(name){
    return localStorage.getItem(name);
}

Storage.removeInArray = function(name,item){
    if(localStorage.name!==undefined){
        var list=JSON.parse(localStorage[name]);
        _.remove(list,function(i){return i===item});
    }
}

Storage.removeItem = function(name){
    localStorage.removeItem(name);
}
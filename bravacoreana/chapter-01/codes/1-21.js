const users = require("./data/users")


function findBy(key, list, val) {
    for(var i=0, len=list.length; i<len; i++) {
        if(list[i][key]===val) return list[i];
    }
}

console.log(findBy('name', users, "BJ"));   // { id: 3, name: 'BJ', age: 32 }
console.log(findBy("id", users, 2));    // { id: 2, name: 'HA', age: 25 }
console.log(findBy('age', users, 28));  // { id: 4, name: 'PJ', age: 28 }

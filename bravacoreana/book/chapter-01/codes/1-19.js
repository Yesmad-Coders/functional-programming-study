const users = require("./data/users");

function findByName(list, name) {
    for (var i=0, len=list.length; i<len; i++) {
        if(list[i].name == name) return list[i];
    }
}

console.log(findByName(users, "BJ")); // { id: 3, name: "BJ", age: 32 }
console.log(findByName(users, "JE")); // { id: 5, name: "JE", age: 27 }
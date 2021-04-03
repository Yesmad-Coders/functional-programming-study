const users = require("./data/users");

function findById(list, id) {
    for (var i=0, len=list.length; i < len; i++) {
        if(list[i].id == id) return list[i];
    }
}
console.log(findById(users, 3));    // { id: 3, name: "BJ", age: 32 }
console.log(findById(users, 5));    // { id: 5, name: "JE", age: 27 }

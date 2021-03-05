function findByAge(list, age) {
    for(var i=0, len = list.length; i<len; i++) {
        if(list[i].age == age) return list[i];
    }
}

console.log(findByAge(users, 28));  // { id: 4, name: "PJ", age: 28 }
console.log(findByAge(users, 25));  // { id: 2, name: "HA", age: 25 }
const map = require("./data/map")
const filter = require("./data/filter")
const users = require("./data/users")
const users2 = require("./data/users2")

console.log(
    map(
        filter(users, function(u) { return u.age >= 30 }),
        function(u) { return u.name; }));   // [ 'ID', 'BJ', 'JM' ]

console.log(map(
    filter(users2, function(u) { return u.getAge() > 30 }),
    function(u) { return u.getName(); })); // ["ID"]